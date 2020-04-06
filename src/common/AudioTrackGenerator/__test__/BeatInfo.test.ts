import BeatInfo from "../BeatInfo";

describe('BeatInfo', () => {
  it('constructs with index', () => {
    const beat = new BeatInfo(2);
    expect(beat.index).toStrictEqual(2);
    expect(beat.offset).toStrictEqual(0);
    expect(beat.time).toStrictEqual(0);
  });

  it('sets offset to -1.0', () => {
    const beat = new BeatInfo(0);
    beat.offset = -11.0;
    expect(beat.offset).toStrictEqual(-1.0);
  });

  it('sets offset to 1.0', () => {
    const beat = new BeatInfo(0);
    beat.offset = 1.0;
    expect(beat.offset).toStrictEqual(1.0);
  });

  it('clamps offset 2.0 to 1.0', () => {
    const beat = new BeatInfo(0);
    beat.offset = 2.0;
    expect(beat.offset).toStrictEqual(1.0);
  });

  it('clamps offset -2.0 to -1.0', () => {
    const beat = new BeatInfo(0);
    beat.offset = -2.0;
    expect(beat.offset).toStrictEqual(-1.0);
  });


  it('sets time', () => {
    const beat = new BeatInfo(0);
    beat.time = 1.2;
    expect(beat.time).toBeCloseTo(1.2);
  });
});
