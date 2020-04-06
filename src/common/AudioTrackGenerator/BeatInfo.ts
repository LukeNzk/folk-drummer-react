class BeatInfo {
  private _offset = 0;
  private _index: number;
  private _time = 0;

  constructor(index: number) {
    this._index = index;
  }

  set offset(val: number) {
    this._offset = Math.max(-1, Math.min(1, val));
  }

  get offset(): number { return this._offset; }

  get index(): number { return this._index; }

  set time(val: number) { this._time = val; }
  get time(): number { return this._time; }
}

export default BeatInfo;
