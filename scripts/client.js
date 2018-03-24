
// Next steps:
// - run it 1000 times to see how often predators/prey die out first.
// - add more species with more complex rules.
//

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

// Ok, seems to work:
var world2 = new LifeWorld(plan, {
  "#": Wall,
  "o": BouncingCritter
});




var valley = new LifeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": PlantEater,
   "*": Plant}
);



// console.log(valley.toString());
// valley.turn();
// console.log(valley.toString());

// console.log(world2.toString());
// console.log(world.toString());
var arr = world.toString().split('\n');
// console.log(arr);

//
// var body = document.getElementsByTagName('body')[0];
// console.log(body);
// body.innerHTML = '<ul><li>hi</li></ul>';

// Bringing in jQuery for animation:
$(document).ready(function() {

  var body = $('body');

  // draw initial world:
  valley.toString().split('\n').forEach((str) => {
  // plan.forEach((str) => {

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

  setInterval(moveWorld, 20);

});

var count = 0;

function moveWorld() {
  var oldArr = valley.toString().split('\n');
  // console.log(oldArr);
  valley.turn();
  // console.log(oldArr);
  // world.turn();
  // should just make global:
  var body = $('body');

  // Hmm i wonder why .innerHTML didn't work...OH Because it's a jquery element!
  body.empty();

  // var arr = world.toString().split('\n');
  var arr = valley.toString().split('\n');

  oldArr.forEach(function(line, ind) {
    if (line != arr[ind]) {
      return;
    } else {
      // Ok, looks like what we care about is if we get 13 'elses' in a row before a 'hi':
      // console.log('else');
      count ++;
    }
    // console.log('hi');

    // INTERESTING: it works! And not as I expected if the plants out-survive the herbivores: will tell us we're done before they've filled whole grid.
    if (count == 13) {
      console.log('we did it hoss');
    }

    if (ind == oldArr.length - 1) {
      count = 0;
      // console.log('hi');
    }

  });

  // count ++;

  // Whoa, this makes it suuuuper buggy -- the inefficiency?:
  // for (var i=0; i < oldArr.length; i++) {
  //   if (oldArr[i] != arr[i]) {
  //     return;
  //   }
  //
  //   if (i == oldArr.length) {
  //     console.log('all done hoss');
  //   }
  // }


  // if (oldArr == arr) {
  //   console.log('all done hoss');
  // }

  arr.forEach((str) => {
    // Whitespace won't show up if we do this:
    // body.append('<p>' + str + '</p>');
    var output = '';
    for (var i=0; i < str.length; i++) {
      if (str[i] == ' ') {
        output += '-';
      }
      output += str[i];
    }

    body.append('<p>' + output + '</p>');
  });

}


//reason why classes aren't hoisted: so as not to mess up "extends"



//chillin
