
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
// console.log(plan);

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

// It's interesting that these are hoisted into *all the other class modules*:
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

function Wall() {}

var world = new World(plan, {
  "#": Wall,
  "o": BouncingCritter
});

console.log(world.toString());
var arr = world.toString().split('\n');
console.log(arr);

//
// var body = document.getElementsByTagName('body')[0];
// console.log(body);
// body.innerHTML = '<ul><li>hi</li></ul>';

// Bringing in jQuery for animation:
$(document).ready(function() {

  var body = $('body');

  plan.forEach((str) => {
    // Whitespace won't show up if we do this:
    // body.append('<p>' + str + '</p>');
    var output = '';
    for (var i=0; i < str.length; i++) {
      if (str[i] == ' ') {
        // console.log('what');
        output += '-';
      }
      output += str[i];
    }

    body.append('<p>' + output + '</p>');
  });

  setInterval(moveWorld, 1000);

  // for (var i = 0; i < 5; i++) {
  //   world.turn();
  //   // console.log(world.toString());
  // }
});

// var worldArray = world.toString();


function moveWorld() {
  world.turn();
  // should just make global:
  var body = $('body');

  // Hmm i wonder why .innerHTML didn't work...OH Because it's a jquery element!
  body.empty();

  var arr = world.toString().split('\n');

  arr.forEach((str) => {
    // Whitespace won't show up if we do this:
    // body.append('<p>' + str + '</p>');
    var output = '';
    for (var i=0; i < str.length; i++) {
      if (str[i] == ' ') {
        // console.log('what');
        output += '-';
      }
      output += str[i];
    }

    body.append('<p>' + output + '</p>');

  // console.log(world.toString());

  });


}




//chillin
