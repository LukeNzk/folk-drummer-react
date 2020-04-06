import CircularIterator from '../CircularIterator';

describe('CircularIterator', () => {
  it ('returns undefined with empty array', () => {
    const data: number[] = [];
    const iter = new CircularIterator(data);

    expect(iter.next()).toStrictEqual(undefined);
    expect(iter.next()).toStrictEqual(undefined);
    expect(iter.next()).toStrictEqual(undefined);
  });

  it('handles array of 1 element', () => {
    const data = [151];
    const iter = new CircularIterator(data);

    expect(iter.next()).toStrictEqual(151);
    expect(iter.next()).toStrictEqual(151);
    expect(iter.next()).toStrictEqual(151);
  });

  it('handles array of 5 elements', () => {
    const data = [151, 423, 123, 2, 5];
    const iter = new CircularIterator(data);

    for (let i = 0; i < data.length; ++i) {
      expect(iter.next()).toStrictEqual(data[i]);
    }

    expect(iter.next()).toStrictEqual(151);
    expect(iter.next()).toStrictEqual(423);
  });
});
