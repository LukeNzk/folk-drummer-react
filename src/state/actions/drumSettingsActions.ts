import { 
  UPDATE_TEMPO,
  UPDATE_BEAT_OFFSET,
  UPDATE_TEMPO_OSCILATION,
  SettingsActionTypes, // eslint-disable-line no-unused-vars
} from 'state/types';

export function updateTempo(tempo: number): SettingsActionTypes {
  return { 
    type: UPDATE_TEMPO,
    payload: tempo
  }
}

export function updateBeatOffset(offset: number): SettingsActionTypes {
  return { 
    type: UPDATE_BEAT_OFFSET,
    payload: offset
  }
}

export function updateTempoOscilation(tempo: number): SettingsActionTypes {
  return { 
    type: UPDATE_TEMPO_OSCILATION,
    payload: tempo
  }
}
