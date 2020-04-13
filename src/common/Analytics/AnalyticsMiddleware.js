import {
  COMMIT_TEMPO,
  COMMIT_BEAT_OFFSET,
  COMMIT_TEMPO_OSCILATION,
  TOGGLE_PLAYBACK
} from 'state/types';

import AnalyticsWrapper from './AnalyticsWrapper';

const analytics = new AnalyticsWrapper();

const analyticsMiddleware = store => next => action => { // eslint-disable-line no-unused-vars
  switch (action.type) {
    case COMMIT_TEMPO:
      analytics.setTempo(action.payload);
      break;
    case COMMIT_BEAT_OFFSET:
      analytics.setSecondBeatOffset(action.payload);
      break;
    case COMMIT_TEMPO_OSCILATION:
      analytics.setTempoOscilation(action.payload);
      break;
    case TOGGLE_PLAYBACK:
      analytics.playButtonEvent(action.payload);
      break;
    default:
  }
  return next(action);
};

export default analyticsMiddleware;
