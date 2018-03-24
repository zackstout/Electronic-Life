
// Next steps:
// - run it 1000 times to see how often herbivores/plants die out first.
// - add more species with more complex rules.
// - see how long it takes, whether that correlates to the winner.
// - let it choose random number of herbivores to start, random number of plants:
// - change regen rate of plants.

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
// var world2 = new LifeWorld(plan, {
//   "#": Wall,
//   "o": BouncingCritter
// });


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


var arr = world.toString().split('\n');

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

    body.append('<p>&emsp;&emsp;&emsp;&emsp;' + output + '</p>');
  });

  interv = setInterval(moveWorld, 120);

});

var interv;
var count = 0;

function moveWorld() {
  var oldArr = valley.toString().split('\n');
  valley.turn();
  // world.turn();
  // should just make global:
  var body = $('body');

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

    // INTERESTING: it works! And not as I expected if the plants out-survive the herbivores: will tell us we're done before they've filled whole grid.
    if (count == 13) {
      // console.log('we did it hoss');

      // yeah this is ugly but appears to be working now we've added extra catches:
      var bool = (oldArr[5].indexOf('*') > -1) || (oldArr[11].indexOf('*') > -1) || (oldArr[8].indexOf('*') > -1);
      // console.log(bool);

      var winner = bool ? 'plants' : 'herbivores';
      // console.log(winner);

      if (bool) {
        plantWins++;
      } else {
        herbivoreWins++;
      }

      console.log("Plants: ", plantWins, " and Herbivores: ", herbivoreWins);

      // console.log(plantWins);
      clearInterval(interv);


      // reset valley to starting position:
      valley = new LifeWorld(
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


      interv = setInterval(moveWorld, 20);
      return(winner);
    }

    if (ind == oldArr.length - 1) {
      count = 0;
      // console.log('hi');
    }

  });

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

    // Speed it up by getting rid of DOM...Hmm doesn't seemt o speed it up:
    body.append('<p>&emsp;&emsp;&emsp;&emsp;' + output + '</p>');
  });

}


var plantWins = 0;
var herbivoreWins = 0;

//reason why classes aren't hoisted: so as not to mess up "extends"



//chillin
