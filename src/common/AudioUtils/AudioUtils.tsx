class AudioUtils {
  private _context!: AudioContext;

  private initialize = () => { 
    this._context = new AudioContext(); 
    console.log("Audio context initialized.");
  }

  get context() : AudioContext {
    if (!this._context) {
      this.initialize();
    }

    return this._context;
  }

  loadClip = (url: string) => {
    const createRequest = (): XMLHttpRequest => {
      let req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.responseType = 'arraybuffer';
      return req;
    };

    const result = new Promise<AudioBufferSourceNode>((resolve, reject) => {
        const req = createRequest();
        req.onload = () => {
          const ctx = this.context;
          
          ctx.decodeAudioData(req.response, (buffer: AudioBuffer) => {
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            resolve(source);
          });
        }

        req.onerror = reject;
      req.send();
    });

    return result;
  }
}

export default AudioUtils;
