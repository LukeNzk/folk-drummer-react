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

    const result = new Promise<AudioBuffer>((resolve, reject) => {
        const req = createRequest();
        req.onload = () => {
          const ctx = this.context;
          
          ctx.decodeAudioData(req.response, (buffer: AudioBuffer) => {
            resolve(buffer);
          });
        }

        req.onerror = reject;
      req.send();
    });

    return result;
  }

  play = (buffer: AudioBuffer) => {
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.context.destination);
    source.start();
  }
}

export default AudioUtils;
