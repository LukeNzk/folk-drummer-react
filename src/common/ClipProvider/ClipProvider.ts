class AudioClip {
  buffer?: AudioBuffer;
}

class ClipProvider {
  private _clips: Array<AudioClip>;

  constructor() {
    this._clips = [];
  }

  next(): AudioClip {
    if (this._clips.length === 0) {
      throw new Error("No clips provided.");
    }
    const index = this.getRandomClipIndex();
    return this._clips[index];
  }

  private getRandomClipIndex = (): number => Math.floor(Math.random() * this._clips.length);

  push(clip: AudioClip) {
    this._clips.push(clip);
  }
}

export { AudioClip };
export default ClipProvider;
