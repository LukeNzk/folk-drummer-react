import {
  COMMIT_TEMPO,
  COMMIT_BEAT_OFFSET,
  COMMIT_TEMPO_OSCILATION
} from 'state/types';

import AnalyticsWrapper from './AnalyticsWrapper'; // eslint-disable-line no-unused-vars

// const analytics = new AnalyticsWrapper();

const analyticsMiddleware = store => next => action => { // eslint-disable-line no-unused-vars
  switch (action.type) {
    case COMMIT_TEMPO:
      console.log(action);
      break;
    case COMMIT_BEAT_OFFSET:
      console.log(action);
      break;
    case COMMIT_TEMPO_OSCILATION:
      console.log(action);
      break;
    default:
  }
  return next(action);
};

export default analyticsMiddleware;
