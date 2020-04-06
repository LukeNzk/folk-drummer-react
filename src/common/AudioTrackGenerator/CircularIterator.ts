class CircularIterator<T> {
  private _array: Array<T>;
  private _currentIndex = 0;

  constructor(array: Array<T>) {
    this._array = array;
  }
  
  next = (): T => {
    const result = this._array[this._currentIndex];

    this._currentIndex = this.getNextIndex();
    return result;
  }

  private getNextIndex = () => {
    const nextIndex = this._currentIndex + 1;
    return (nextIndex === this._array.length) ? 0 : nextIndex;
  }
}

export default CircularIterator;
