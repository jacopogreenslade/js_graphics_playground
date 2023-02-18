class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = sqrt(x * x + y * y);
  }

  normalize = () => {
    if (this.magnitude > 0) {
      return new Vec(this.x / this.magnitude, this.y / this.magnitude);
    }
  };

  sum = (v) => new Vec(this.x + v.x, this.y + v.y);

  dot = (v) => this.x * v.x + this.y * v.y;

  scalarProjection = (v) => this.dot(v) / this.magnitude;

  getNormalLeft = () => new Vec(this.y, -1 * this.x);

  getNormalRight = () => new Vec(-1 * this.y, this.x);
}