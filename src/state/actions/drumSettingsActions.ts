import { 
  UPDATE_TEMPO,
  UPDATE_BEAT_OFFSET,
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
