import AudioTrackGenerator from "..";

let gen:  AudioTrackGenerator;

describe('AudioTrackGenerator', () => {
  beforeEach(() => {
    gen = new AudioTrackGenerator();
  });

  it('constructs empty', () => {
    expect(gen.next()).toBeUndefined();
    expect(gen.interval).toStrictEqual(1);
    expect(gen.measureIndex).toStrictEqual(0);
  });

  it('sets interval using bpm', () => {
    gen.bpm = 120;
    expect(gen.interval).toBeCloseTo(0.5);
  });

  it('changes interval using bpm', () => {
    gen.bpm = 130;
    expect(gen.interval).toBeCloseTo(0.46);
  });

  it('sets beats per measure', () => {
    gen.beatsPerMeasure = 3;
    expect(gen.beatsPerMeasure).toStrictEqual(3);
  });

  it('iterates beats array', () => {
    const measureSize = 3;
    gen.beatsPerMeasure = measureSize;
    const expectedInterval = gen.interval;
    
    for(let i = 0; i < 10; ++i) {
      const beat = gen.next();
      expect(beat).toBeDefined();
      const expectedIndex = i % measureSize;
      expect(beat.index).toStrictEqual(expectedIndex);
      expect(beat.time).toStrictEqual(expectedInterval);
    }
  });

  it('tracks measure index', () => {
    const measureSize = 3;
    gen.beatsPerMeasure = measureSize;

    let expectedMeasureIndex = 0;
    for (let i = 0; i < 10; ++i) {
      if (((i + 1) % measureSize) === 0) {
        ++expectedMeasureIndex;
      }

      gen.next();
      expect(gen.measureIndex).toStrictEqual(expectedMeasureIndex);
    }
  });

  it('sets beat offset', () => {
    const measureSize = 3;
    gen.beatsPerMeasure = measureSize;
    gen.setOffset(1, -0.1);

    expect(gen.next().offset).toStrictEqual(0.0);
    expect(gen.next().offset).toStrictEqual(-0.1);
    expect(gen.next().offset).toStrictEqual(0.0);
    
    expect(gen.next().offset).toStrictEqual(0.0);
    expect(gen.next().offset).toStrictEqual(-0.1);
    expect(gen.next().offset).toStrictEqual(0.0);
  });

  it('beat offset out ouf bound', () => {
    const measureSize = 2;
    gen.beatsPerMeasure = measureSize;
    expect(() => gen.setOffset(2, -0.1)).toThrowError("Index out of bound: 2");
  });
});
