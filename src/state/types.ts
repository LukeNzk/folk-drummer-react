export interface DrumSettingsState {
  tempo: number,
  beatOffset: number
}

export const UPDATE_TEMPO = 'UPDATE_TEMPO';
export const UPDATE_BEAT_OFFSET = 'UPDATE_BEAT_OFFSET';

interface UpdateTempoAction {
  type: typeof UPDATE_TEMPO,
  payload: number
}

interface UpdateBeatOffsetAction {
  type: typeof UPDATE_BEAT_OFFSET,
  payload: number
}

export type SettingsActionTypes = UpdateTempoAction | UpdateBeatOffsetAction;
