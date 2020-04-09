import {
  UPDATE_TEMPO,
  SettingsActionTypes, // eslint-disable-line no-unused-vars
  DrumSettingsState // eslint-disable-line no-unused-vars
} from 'state/types';

const initialState: DrumSettingsState = {
  tempo: 120
}

export function drumSettingsReducer(state = initialState, action: SettingsActionTypes): DrumSettingsState {
  switch(action.type) {
    case UPDATE_TEMPO:
      return {
        ...state,
        tempo: action.payload
      };
  }

  return state;
}
