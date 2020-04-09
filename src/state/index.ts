import { combineReducers } from 'redux';
import { drumSettingsReducer } from './reducers/drumSettingsReducer';
import { updateTempo } from './actions/drumSettingsActions';

const rootReducer = combineReducers({
  drumSettings: drumSettingsReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export { updateTempo }
