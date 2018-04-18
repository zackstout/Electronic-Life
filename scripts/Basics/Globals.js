
var interv;
var count = 0;

var plantWins = 0;
var herbivoreWins = 0;

var body;
var arr;

var canvas;
var ctx;


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

var lifePlan = ["############################",
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
                "############################"];

var tigerWorld =  ["####################################################",
                   "#                 ####         ****              ###",
                   "#   *  @  ##                 ########       OO    ##",
                   "#   *    ##        O O                 ****       *#",
                   "#       ##*                        ##########     *#",
                   "#      ##***  *         ****                     **#",
                   "#* **  #  *  ***      #########                  **#",
                   "#* **  #      *               #   *              **#",
                   "#     ##              #   O   #  ***          ######",
                   "#*            @       #       #   *        O  #    #",
                   "#*                    #  ######                 ** #",
                   "###          ****          ***                  ** #",
                   "#       O                        @         O       #",
                   "#   *     ##  ##  ##  ##               ###      *  #",
                   "#   **         #              *       #####  O     #",
                   "##  **  O   O  #  #    ***  ***        ###      ** #",
                   "###               #   *****                    ****#",
                   "####################################################"];

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

function drawWorld(arr) {
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
    $('#world').append('<p>&emsp;&emsp;&emsp;&emsp;' + output + '</p>');
  });
}

// what are we using this for? Checking whether we're at the last world of the world array without having altered anything?
// Or is it ever even called......?
function increment(x) {
  x++;
  return x;
}





function getPopulationCount(arr) {
  var res = {
    tigers: 0,
    herbivores: 0,
    plants: 0
  };

  // console.log(arr);

  arr.forEach(el => {
    for (let i=0; i < el.length; i++) {
      if (el[i] == "*") res.plants++;
      else if (el[i] == "@") res.tigers++;
      else if (el[i] == 'O') res.herbivores++;
    }
  });

  return res;
}



function graph(pop) {
  ctx.clearRect(0, 0, 700, 300);
  // plant population:
  ctx.beginPath();
  ctx.arc(350, pop.plants / 3, 5, 0, 2*Math.PI);
  ctx.fillStyle = 'green';
  ctx.fill();

  // herbivore population:
  ctx.beginPath();
  ctx.arc(350, pop.herbivores * 10, 5, 0, 2*Math.PI);
  ctx.fillStyle = 'lightBlue';
  ctx.fill();
}
