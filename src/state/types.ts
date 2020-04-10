export interface DrumSettingsState {
  tempo: number,
  beatOffset: number,
  tempoOscilation: number
}

export const UPDATE_TEMPO = 'UPDATE_TEMPO';
export const UPDATE_BEAT_OFFSET = 'UPDATE_BEAT_OFFSET';
export const UPDATE_TEMPO_OSCILATION = 'UPDATE_TEMPO_OSCILATION';

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

export type SettingsActionTypes = UpdateTempoAction | UpdateBeatOffsetAction | UpdateTempoOscilation;
