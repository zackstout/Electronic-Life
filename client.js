
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
}


// var grid = new Grid(5, 5);
// console.log(grid.get(new Vector(1,1)));
// grid.set(new Vector(1, 1), "X");
// console.log(grid.get(new Vector(1,1)));

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
  // so we are getting plenty of empty spaces..:
  // console.log(ch);
  if (ch == " ") {
    // console.log('hi');
    return null;
  }
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

function charFromElement(el) {
  // why is el alwys #??
  // console.log(el);
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
    // not an issue with the arrow function...:

    // There's actually good reason we don't use this.grid. Could use var self = this as a workaround, but ES6 fixes it. .bind() is another workaround. Finally, can use an optional second context parameter for map and forEach:
    map.forEach(function(line, y) {
      // console.log(y);
      for (var x=0; x < line.length; x++) {
        // Ok so it's getting the x,, but not setting it:
        // console.log(x);
        // thought maybe we needed a this here...Nope:
        var vector = new Vector(x, y);
        grid.set(vector, elemFromChar(legend, line[x]));
        // console.log(vector);

        // plenty of nulls here:
        // console.log(elemFromChar(legend, line[x]));
      }
    });

  }

  toString() {
    // console.log(this.grid);
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

}

function Wall() {}

var world = new World(plan, {
  "#": Wall,
  "o": BouncingCritter
});

console.log(world.toString());














//chillin
