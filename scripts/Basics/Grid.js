
class Grid {
  constructor(w, h) {
    this.space = new Array(w * h);
    this.w = w;
    this.h = h;
  }

  isInside(v) {
    return v.x >= 0 && v.x < this.w && v.y >= 0 && v.y < this.h;
  }

  get(v) {
    return this.space[v.x + this.w * v.y];
  }

  set(v, val) {
    this.space[v.x + this.w * v.y] = val;
  }

  // ahhhh, we need this for World.turn() to work:
  forEach(f, context) {
    for (var y = 0; y < this.h; y++) {
      for (var x = 0; x < this.w; x++) {
        var value = this.space[x + y * this.w];
        if (value != null) {
          f.call(context, value, new Vector(x, y));
        }
      }
    }
  }
}
