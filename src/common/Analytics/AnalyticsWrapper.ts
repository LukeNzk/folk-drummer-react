import app from 'firebase/app';
import 'firebase/analytics';
import config from 'firebase_config';

export default class Analytics {
  private _analytics: app.analytics.Analytics;
  constructor() {
    app.initializeApp(config);
    this._analytics = app.analytics();
  }

  private logEvent = (title: string, payload: any) => {
    this._analytics.logEvent(title, payload);
  }

  playButtonEvent(toggle: boolean) {
    this.logEvent("play_button", { value: toggle});
  }

  setTempo(value: number) {
    this.logEvent("set_tempo", { value: value });
  }

  setSecondBeatOffset(value: number) {
    this.logEvent("set_second_beat_offset", { value: value });
  }

  setTempoOscilation(value: number) {
    this.logEvent("set_tempo_oscilation", { value: value });
  }
}
