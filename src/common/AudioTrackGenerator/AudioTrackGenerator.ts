import CircularIterator from './CircularIterator';
import BeatInfo from './BeatInfo';

class AudioTrackGenerator {
  private _interval: number;
  private _beats: Array<BeatInfo>;
  private _iterator!: CircularIterator<BeatInfo>;
  private _beatCounter = 0;

  constructor() {
    this._interval = 1;
    this._beats = [];
    this.beatsPerMeasure = 0;
  }

  set bpm(val: number) {
    const clamped = Math.max(1, val);
    this._interval = 60 / clamped;

    this._beats.forEach(beat => {
      beat.time = this._interval;
    });
  }

  get interval(): number { return this._interval; }

  set beatsPerMeasure(count: number) {
    this._beats = [];
    for (let i = 0; i < count; ++i) {
      const beat = new BeatInfo(i);
      beat.time = this._interval;
      this._beats.push(beat);
    }

    this._iterator = new CircularIterator(this._beats);
  }

  get beatsPerMeasure(): number { return this._beats.length; }

  next = (): BeatInfo => {
    const result = this._iterator.next();
    if (result) {
      ++this._beatCounter;
    }
    return result;
  }

  get measureIndex(): number {
    if (this._beats.length === 0) {
      return 0;
    }

    return Math.floor(this._beatCounter / this._beats.length);
  }

  setOffset(beatIndex: number, offset: number) {
    if (beatIndex < 0 || beatIndex >= this._beats.length) {
      throw new Error("Index out of bound: " + beatIndex);
    }

    this._beats[beatIndex].offset = offset;
  }
}

export default AudioTrackGenerator;
