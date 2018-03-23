
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];
console.log(plan);


class Vector {
  constructor(x, y) {
    // AHA! THE BUG WAS ALL THE WAY UP HERE! I SET BOTH TO Y:
    this.x = x;
    this.y = y;
  }

  plus(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
}

class Grid {
  constructor(w, h) {
    this.space = new Array(w * h);
    this.w = w;
    this.h = h;
  }

  isInside(v) {
    return v.x >= 0 && v.x < this.w && v.y >= 0 && v.y < this.h;
  }

  get(v) {
    return this.space[v.x + this.w * v.y];
  }

  set(v, val) {
    // ok we're getting proper values here:
    // console.log(val);
    this.space[v.x + this.w * v.y] = val;
    // console.log(this.space);

    // Here's an issue: we're only getting cases where x ==y!:
    // console.log(v);
  }

  // ahhhh, we need this for World.turn() to work:
  forEach(f, context) {
    for (var y = 0; y < this.h; y++) {
      for (var x = 0; x < this.w; x++) {
        var value = this.space[x + y * this.w];
        if (value != null) {
          f.call(context, value, new Vector(x, y));
        }
      }
    }
  }
}

// Interesting that classes aren't hoisted, so this has to go below:
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// couldn't we use Object.keys? He answers: no guarantee about order.
var directionNames = "n ne e se s sw w nw".split(" ");

class BouncingCritter {
  constructor() {
    this.direction = randomElement(directionNames);
  }

  act(view) {
    if (view.look(this.direction) != " ") {
      this.direction = view.find(" ") || "s";
    }
    return {type: "move", direction: this.direction};
  }
}

function elemFromChar(legend, ch) {
  if (ch == " ") {
    return null;
  }
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

function charFromElement(el) {
  if (el == null) {
    return " ";
  } else {
    return el.originChar;
  }
}

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
    console.log(this.grid);
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

function Wall() {}

var world = new World(plan, {
  "#": Wall,
  "o": BouncingCritter
});

console.log(world.toString());

class View {
  constructor(world, v) {
    this.world = world;
    // when is this name used?
    this.vector = v;
  }

  look(dir) {
    // this is where the name is used!:
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
      return charFromElement(this.world.grid.get(target));
    } else {
      //pretend there's a wall even outside the world:
      return "#";
    }
  }

  findAll(ch) {
    var found = [];
    for (var dir in directions) {
      if (this.look(dir) == ch) {
        found.push(dir);
      }
    }
    return found;
  }

  find(ch) {
    var found = this.findAll(ch);
    if (found.length == 0) {
      return null;
    }
    return randomElement(found);
  }
}




for (var i = 0; i < 5; i++) {
  world.turn();
  console.log(world.toString());
}







//chillin
