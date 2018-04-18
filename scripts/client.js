
// Next steps:
// - run it 1000 times to see how often herbivores/plants die out first.
// - add more species with more complex rules (e.g. Predators).
// - see how long the simulation/iteration takes, whether that correlates to the winner.
// - let it choose random number of herbivores to start, random number of plants:
// - change regen rate of plants.
// - Map each population, for each iteration. two graphs overlaid against one time axis.
// - ***Oh shit I just had that idea and thought it was new!!!

var world = new World(plan, {
  "#": Wall,
  "o": BouncingCritter
});

var valley = new LifeWorld(lifePlan, {
  "#": Wall,
  "O": PlantEater,
  "*": Plant}
);

var tigers = new LifeWorld(tigerWorld, {
  "#": Wall,
  "@": Tiger,
  "O": PlantEater,
  "*": Plant}
);

// Bringing in jQuery for animation:
$(document).ready(function() {
  body = $('body');
  // for random critters world:
  arr = world.toString().split('\n');
  // for plant/herbivore world:
  var tigersArray = tigers.toString().split('\n');
  // console.log(tigersArray);

  // Draw initial state of world:
  drawWorld(tigersArray);

  // Animate world:
  interv = setInterval(moveWorld, 120);
});

// Animator function:
function moveWorld() {
  body.empty();

  var oldArr = tigers.toString().split('\n');
  tigers.turn();
  var arr = tigers.toString().split('\n');


  var pop = getPopulationCount(arr);
  console.log(pop);



  // console.log(arr);
  // Check if the simulation is finished:
  oldArr.forEach(function(line, ind) {
    if (line != arr[ind]) {
      return;
    } else {
      // Ok, looks like what we care about is if we get 13 'elses' in a row before a 'hi':
      // console.log('else');
      count ++;
    }

    if (count == oldArr.length) {
      // yeah this is ugly but appears to be working now we've added extra catches:
      // Aww jeez we'll have to fix it for bigger grids though:
      var bool = (arr[1].indexOf('*') > -1) || (arr[2].indexOf('*') > -1) || (arr[3].indexOf('*') > -1) || (arr[4].indexOf('*') > -1) || (arr[5].indexOf('*') > -1) || (arr[6].indexOf('*') > -1) || (arr[7].indexOf('*') > -1) || (arr[8].indexOf('*') > -1) || (arr[9].indexOf('*') > -1) || (arr[10].indexOf('*') > -1) || (arr[11].indexOf('*') > -1);

      var winner = bool ? 'plants' : 'herbivores';

      if (bool) {
        plantWins++;
      } else {
        herbivoreWins++;
      }

      // bool ? increment(plantWins) : increment(herbivoreWins);

      console.log("Plants: ", plantWins, " and Herbivores: ", herbivoreWins);

      clearInterval(interv);

      // Reset tigers to initial state:
      tigers = new LifeWorld(tigerWorld, {
        "#": Wall,
        "@": Tiger,
        "O": PlantEater,
        "*": Plant}
      );

      // Go 6 times faster for each iteration after the first one:
      interv = setInterval(moveWorld, 20);
    }

    if (ind == oldArr.length - 1) {
      count = 0;
    }

  });

  drawWorld(arr);
} // end moveWorld

// Reason why classes aren't hoisted: so as not to mess up "extends"



//chillin
