
function lerp(x0: number, x1: number, t: number) {
  return (1 - t) * x0 + t * x1;
}

class ValueOscilator {
  private _max = 0;
  private _target = 0;
  private _value = 0;
  private _directionCooldown = 0;

  setOscilationValue = (val: number) => {
    if (val !== this._max)
    {
      this._max = val;
      this._target = 0;
      this._value = 0;
      this._directionCooldown = 0;
    }
  }
  
  get value() { return this._value; }

  tick = (dt: number) => {
    this._directionCooldown -= dt;
    if (this._directionCooldown <= 0) {
      this._directionCooldown = 4; // seconds
      this._target = Math.random() * this._max;
    }

    this._value = lerp(this._value, this._target, 0.5 * dt);
    console.log("target: " + this._value);
  }
}

export default ValueOscilator;
