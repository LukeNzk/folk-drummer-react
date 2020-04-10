import {
  UPDATE_TEMPO,
  UPDATE_BEAT_OFFSET,
  SettingsActionTypes, // eslint-disable-line no-unused-vars
  DrumSettingsState // eslint-disable-line no-unused-vars
} from 'state/types';

const initialState: DrumSettingsState = {
  tempo: 190,
  beatOffset: -0.18 
}

export function drumSettingsReducer(state = initialState, action: SettingsActionTypes): DrumSettingsState {
  switch(action.type) {
    case UPDATE_TEMPO:
      return {
        ...state,
        tempo: action.payload
      };
    case UPDATE_BEAT_OFFSET:
      return {
        ...state,
        beatOffset: action.payload
      };
  }

  return state;
}
