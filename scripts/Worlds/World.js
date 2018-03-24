
class World {
  constructor(map, legend) {
    console.log(map);
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    // There's actually good reason we don't use this.grid. Could use var self = this as a workaround, but ES6 fixes it. .bind() is another workaround. Finally, can use an optional second context parameter for map and forEach:
    map.forEach((line, y) => {
      // console.log(y);
      for (var x=0; x < line.length; x++) {
        var vector = new Vector(x, y);
        grid.set(vector, elemFromChar(legend, line[x]));
      }
    });

  }

  toString() {
    var output = "";
    for (var y=0; y < this.grid.h; y++) {
      for (var x=0; x < this.grid.w; x++) {
        var element = this.grid.get(new Vector(x, y));
        output += charFromElement(element);
      }
      output += "\n";
    }
    return output;
  }

  turn() {
    var acted = [];
    // console.log(this.grid);
    // this will be the tricky one to change to arrow:
    this.grid.forEach(function(critter, vector) {
      if (critter.act && acted.indexOf(critter) == -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this);
  }

  // These two functions *aren't* part of external interface of object; they should only be accessed privately.
  letAct(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type == 'move') {
      // validate direction (so that e.g. critters could be programmed sloppily -- actions might not make sense):
      var dest = this.checkDestination(action, vector);
      if (dest && this.grid.get(dest) == null) {
        // vacate the space:
        this.grid.set(vector, null);
        // add the critter to destination:
        this.grid.set(dest, critter);
      }
    }
  }

  checkDestination(action, vector) {
    // is this built in?
    if (directions.hasOwnProperty(action.direction)) {
      var dest = vector.plus(directions[action.direction]);
      if (this.grid.isInside(dest)) {
        return dest;
      }
    }
  }

}
