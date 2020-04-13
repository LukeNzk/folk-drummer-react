export interface DrumSettingsState {
  tempo: number,
  beatOffset: number,
  tempoOscilation: number
}

export const UPDATE_TEMPO = 'UPDATE_TEMPO';
export const UPDATE_BEAT_OFFSET = 'UPDATE_BEAT_OFFSET';
export const UPDATE_TEMPO_OSCILATION = 'UPDATE_TEMPO_OSCILATION';

export const COMMIT_TEMPO = 'COMMIT_TEMPO';
export const COMMIT_BEAT_OFFSET = 'COMMIT_BEAT_OFFSET';
export const COMMIT_TEMPO_OSCILATION = 'COMMIT_TEMPO_OSCILATION';

export const TOGGLE_PLAYBACK = 'TOGGLE_PLAYBACK';

interface UpdateTempoAction {
  type: typeof UPDATE_TEMPO,
  payload: number
}

interface UpdateBeatOffsetAction {
  type: typeof UPDATE_BEAT_OFFSET,
  payload: number
}

interface UpdateTempoOscilation {
  type: typeof UPDATE_TEMPO_OSCILATION,
  payload: number
}

interface CommitTempo {
  type: typeof COMMIT_TEMPO,
  payload: number
}

interface CommitBeatOffset {
  type: typeof COMMIT_BEAT_OFFSET,
  payload: number
}

interface CommitTempoOscilation {
  type: typeof COMMIT_TEMPO_OSCILATION,
  payload: number
}

interface TogglePlayback {
  type: typeof TOGGLE_PLAYBACK,
  payload: boolean 
}

export type SettingsActionTypes = 
  UpdateTempoAction | 
  UpdateBeatOffsetAction | 
  UpdateTempoOscilation |
  CommitTempo |
  CommitBeatOffset |
  CommitTempoOscilation |
  TogglePlayback;
