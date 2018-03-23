
class Vector {
  constructor(x, y) {
    // AHA! THE BUG WAS ALL THE WAY UP HERE! I SET BOTH TO Y:
    this.x = x;
    this.y = y;
  }

  plus(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
}
