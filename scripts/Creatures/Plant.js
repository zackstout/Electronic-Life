
class Plant {
  constructor() {
    this.energy = 3 + Math.random() * 4;
  }

  act(view) {
    if (this.energy > 15) {
      var space = view.find(" ");
      if (space) {
        return {type: "reproduce", direction: space};
      }
    }

    // max energy-level is 20:
    if (this.energy < 20) {
      return {type: "grow"};
    }
  }
}
