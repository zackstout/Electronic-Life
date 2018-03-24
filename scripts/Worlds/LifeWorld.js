
var actionTypes = Object.create(null);

actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 1 ||
      this.grid.get(dest) != null) {
        return false;
      }
  // moving expends energy:
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  // the target must have energy to consume:
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

// Carnivores' eat function -- we don't need to change anything!:
actionTypes.hunt = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  // the target must have energy to consume:
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.reproduce = function(critter, vector, action) {
  // INTERESTING, had to change to elem instead of element, as i defined it -- but it worked for a while. I guess nothing tried to reproduce until then.
  var baby = elemFromChar(this.legend,
                             critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
    // requires double the child's energy to produce it:
    // changing to 2.5 seems to roughly even the scales (also change subtracted amount!)
      critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};


class LifeWorld extends World {
  constructor(map, legend) {
    super(map, legend);
    // console.log(actionTypes);
  }

  // Overwriting:
  letAct(critter, vector) {
    var action = critter.act(new View(this, vector));
    var handled = action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action);

    if (!handled) {
      critter.energy -= 0.2;
      // death:
      if (critter.energy <=0) {
        this.grid.set(vector, null);
      }
    }
  }
}
