
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
    // choose random direction from valid directions:
    return randomElement(found);
  }
}
