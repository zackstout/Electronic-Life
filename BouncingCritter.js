
class BouncingCritter {
  constructor() {
    this.direction = randomElement(directionNames);
  }

  act(view) {
    if (view.look(this.direction) != " ") {
      // where find and findAll come into play:
      this.direction = view.find(" ") || "s";
    }
    return {type: "move", direction: this.direction};
  }
}
