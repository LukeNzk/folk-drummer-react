import AudioTrackGenerator from 'common/AudioTrackGenerator';
import ClipProvider from 'common/ClipProvider';
import { AudioClip } from 'common/ClipProvider';
import assets from 'assets/sfx';
import AudioUtils from 'common/AudioUtils'; // eslint-disable-line no-unused-vars
import { isNullOrUndefined, isNull } from 'util';
import BeatInfo from 'common/AudioTrackGenerator/BeatInfo'; // eslint-disable-line no-unused-vars

type BeatChangedCallback = (beat: BeatInfo) => void;
class AudioTrackPlayer {
  private _trackGenerator: AudioTrackGenerator;
  private _clips: Array<ClipProvider>;
  private _audioUtils: AudioUtils;
  private _loopHandle!: number;
  private _timeSinceLastBeat = 0;
  private _currentBeat: BeatInfo | null = null;

  private _onBeatChanged!: BeatChangedCallback;

  constructor(
    audio: AudioUtils | undefined) {
    this._trackGenerator = new AudioTrackGenerator();
    this._trackGenerator.beatsPerMeasure = 3;
    this._clips = [];
    this._audioUtils = audio as AudioUtils;
    this.loadClips();
  }

  setOnBeatChanged = (callback: BeatChangedCallback) => {
    this._onBeatChanged = callback;
  }

  private loadClips = async () => {
    const sounds = await assets.sounds();

    const loaders = Object.keys(sounds).map((key, index) => {
      const files = sounds[key].files;
      const result = this.loadClipFiles(files).then(clips => {
        const clipProvider = new ClipProvider();
        clips.forEach(clip => clipProvider.push(clip));
        this._clips[index] = clipProvider;
      });

      return result;
    });

    await Promise.all(loaders);
  }

  private loadClipFiles = (files: Array<string>) => {
    const result = new Promise<Array<AudioClip>>((resolve) => {
      let audioClips: Array<AudioClip> = [];
      
      const onClipLoaded = (buffer: AudioBuffer) => {
        const clip = new AudioClip();
        clip.buffer = buffer;
        audioClips.push(clip);
        if (audioClips.length === files.length) {
          // loaded all files
          resolve(audioClips);
        }
      };

      for(const file of files) {
        this._audioUtils.loadClip(file).then(onClipLoaded);
      }
    });

    return result;
  }
  
  private clear = () => {
    if (!isNullOrUndefined(this._loopHandle)) {
      clearInterval(this._loopHandle);
    }

    this._timeSinceLastBeat = 0;
  }

  private getClipProvider = (beatIndex: Number) => {
    if (beatIndex === 0) {
      return this._clips[0];
    }
    else {
      const r = Math.floor(Math.random() + 1);
      return this._clips[r];
    }
  }

  private tick = (dt: number) => {
    if (isNull(this._currentBeat)) {
      return;
    }

    this._timeSinceLastBeat += dt;
    const offset = this._currentBeat.offset;
    const time = this._currentBeat.time;
    const timeOffset = time * offset;
    const interval = time + timeOffset;
    if (this._timeSinceLastBeat >= interval) {
      this._timeSinceLastBeat -= time;
      let clip = this.getClipProvider(this._currentBeat.index).next();

      const skippingBeatChance = [0.0, 0.0, 0.2];
      const skippingBeatRnd = Math.random();
      const skipBeat = (skippingBeatRnd < skippingBeatChance[this._currentBeat.index]);

      this.nextBeat();

      if (skipBeat) {
        clip = this.getClipProvider(this._currentBeat.index).next();
      }
      if (clip.buffer) {
        this._audioUtils.play(clip.buffer);
      }
    }
  }

  private nextBeat = () => {
    const nextBeat = this._trackGenerator.next();
    this._currentBeat && this._onBeatChanged(this._currentBeat);
    this._currentBeat = nextBeat;
  }
  
  start = () => {
    this.clear();
    const interval = 16; // ms
    let time = Date.now();
    this.nextBeat();

      const loop = () => {
      const now = Date.now();
      const deltaTime = now - time;
      time = now;
      this.tick(deltaTime / 1000);
    }

    this._loopHandle = setInterval(loop, interval) as any;
  }

  stop = () => {
    this.clear();
  }

  get generator() { return this._trackGenerator; }

  setBeatOffset = (index: number, val: number) => this._trackGenerator.setOffset(index, val);
}

export default AudioTrackPlayer;
