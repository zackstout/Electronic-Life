
class Dot {
  constructor(y, s) {
    // each dot starts in the middle of the canvas:
    this.x = 350;
    this.y = y;
    this.species = s;
  }

  // Slide dots to the left as time progresses:
  moveLeft() {
    this.x -= 5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2*Math.PI);
    ctx.fillStyle = this.species == 'plant' ? 'green' : 'lightBlue';
    ctx.fill();
  }
}
