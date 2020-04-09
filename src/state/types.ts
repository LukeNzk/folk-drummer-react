export interface DrumSettingsState {
  tempo: number
}

export const UPDATE_TEMPO = 'UPDATE_TEMPO';

interface UpdateTempoAction {
  type: typeof UPDATE_TEMPO,
  payload: number
}

export type SettingsActionTypes = UpdateTempoAction;
