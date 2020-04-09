import AudioTrackGenerator from 'common/AudioTrackGenerator';
import ClipProvider from 'common/ClipProvider';
import { AudioClip } from 'common/ClipProvider';
import click1 from 'assets/click1.wav';
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

  private loadClips = () => {
    const clipProvider = new ClipProvider();
    this._clips.push(clipProvider);

    this._audioUtils.loadClip(click1).then((buffer) => {
      const clip = new AudioClip();
      clip.buffer = buffer;
      clipProvider.push(clip);      
    });
  }
  
  private clear = () => {
    if (!isNullOrUndefined(this._loopHandle)) {
      clearInterval(this._loopHandle);
    }

    this._timeSinceLastBeat = 0;
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
      this._timeSinceLastBeat -= time;
      const clip = this._clips[0].next();
      if (clip.buffer) {
        this._audioUtils.play(clip.buffer);
      }
      
      this.nextBeat();
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
