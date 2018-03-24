
class Tiger {
  constructor() {
    this.energy = 40;
  }

  act(view) {
    var space = view.find(" ");
    if (this.energy > 80 && space) {
      return {type: "reproduce", direction: space};
    }
    var prey = view.find("O");
    if (prey) {
      return {type: "hunt", direction: prey};
    }
    if (space) {
      return {type: "move", direction: space};
    }
  }
}
