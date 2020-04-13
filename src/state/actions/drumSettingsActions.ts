import { 
  UPDATE_TEMPO,
  UPDATE_BEAT_OFFSET,
  UPDATE_TEMPO_OSCILATION,
  COMMIT_TEMPO,
  COMMIT_BEAT_OFFSET,
  COMMIT_TEMPO_OSCILATION,
  TOGGLE_PLAYBACK,
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

export function commitTempo(tempo: number): SettingsActionTypes {
  return {
    type: COMMIT_TEMPO,
    payload: tempo
  }
}

export function commitBeatOffset(offset: number): SettingsActionTypes {
  return {
    type: COMMIT_BEAT_OFFSET,
    payload: offset
  }
}

export function commitTempoOscilation(tempo: number): SettingsActionTypes {
  return {
    type: COMMIT_TEMPO_OSCILATION,
    payload: tempo
  }
}

export function togglePlayback(enabled: boolean): SettingsActionTypes {
  return { 
    type: TOGGLE_PLAYBACK,
    payload: enabled
  }
}
