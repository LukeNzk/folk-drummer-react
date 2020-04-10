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

  private _onBeatChanged: (beat: BeatInfo) => void;

  constructor(
    audio: AudioUtils | undefined, 
    beatChangedCallback : BeatChangedCallback) {
    this._trackGenerator = new AudioTrackGenerator();
    this._trackGenerator.beatsPerMeasure = 3;
    this._clips = [];
    this._audioUtils = audio as AudioUtils;
    this.loadClips();
    this._onBeatChanged = beatChangedCallback;
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
      return this._clips[2];
    }
  }

  private tick = (dt: number) => {
    if (isNull(this._currentBeat)) {
      return;
    }

    this._timeSinceLastBeat += dt;
    const offset = this._currentBeat.offset;
    const time = this._currentBeat.time;
    const interval = time + offset;
    if (this._timeSinceLastBeat >= interval) {
      this.nextBeat();

      this._timeSinceLastBeat -= time;
      const clip = this.getClipProvider(this._currentBeat.index).next();

      if (clip.buffer) {
        this._audioUtils.play(clip.buffer);
      }
    }
  }

  private nextBeat = () => {
    this._currentBeat = this._trackGenerator.next();
    this._onBeatChanged(this._currentBeat);
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
}

export default AudioTrackPlayer;
