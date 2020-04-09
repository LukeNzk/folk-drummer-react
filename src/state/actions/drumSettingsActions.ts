import { 
  UPDATE_TEMPO,
  SettingsActionTypes // eslint-disable-line no-unused-vars
} from 'state/types';

export function updateTempo(tempo: number): SettingsActionTypes {
  return { 
    type: UPDATE_TEMPO,
    payload: tempo
  }
}
