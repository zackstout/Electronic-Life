
// Next steps:
// - run it 1000 times to see how often herbivores/plants die out first.
// - add more species with more complex rules (e.g. Predators).
// - see how long the simulation/iteration takes, whether that correlates to the winner.
// - let it choose random number of herbivores to start, random number of plants:
// - change regen rate of plants.
// - Map each population, for each iteration. two graphs overlaid against one time axis.
//

var world = new World(plan, {
  "#": Wall,
  "o": BouncingCritter
});

var valley = new LifeWorld(lifePlan, {
  "#": Wall,
  "O": PlantEater,
  "*": Plant}
);

var arr = world.toString().split('\n');

// Bringing in jQuery for animation:
$(document).ready(function() {

  var body = $('body');

  // Draw initial world (REFACTOR INTO OWN FUNCTION:):
  valley.toString().split('\n').forEach((str) => {
  // plan.forEach((str) => {

    // Whitespace won't show up if we do this:
    // body.append('<p>' + str + '</p>');
    var output = '';
    for (var i=0; i < str.length; i++) {
      if (str[i] == ' ') {
        output += '-';
      }
      output += str[i];
    }

    body.append('<p>&emsp;&emsp;&emsp;&emsp;' + output + '</p>');
  });

  // Animate world:
  interv = setInterval(moveWorld, 120);

});


// Animator function:
function moveWorld() {
  var oldArr = valley.toString().split('\n');
  valley.turn();

  // should just make global:
  var body = $('body');

  body.empty();

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
      var bool = (arr[1].indexOf('*') > -1) || (arr[2].indexOf('*') > -1) || (arr[3].indexOf('*') > -1) || (arr[4].indexOf('*') > -1) || (arr[5].indexOf('*') > -1) || (arr[6].indexOf('*') > -1) || (arr[7].indexOf('*') > -1) || (arr[8].indexOf('*') > -1) || (arr[9].indexOf('*') > -1) || (arr[10].indexOf('*') > -1) || (arr[11].indexOf('*') > -1);

      var winner = bool ? 'plants' : 'herbivores';

      if (bool) {
        plantWins++;
      } else {
        herbivoreWins++;
      }

      console.log("Plants: ", plantWins, " and Herbivores: ", herbivoreWins);

      clearInterval(interv);

      // Reset valley to initial state:
      valley = new LifeWorld(lifePlan, {
        "#": Wall,
        "O": PlantEater,
        "*": Plant}
      );

      interv = setInterval(moveWorld, 20);
    }

    if (ind == oldArr.length - 1) {
      count = 0;
    }

  });

  // REFACTOR:
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

} // end moveWorld


//reason why classes aren't hoisted: so as not to mess up "extends"



//chillin
