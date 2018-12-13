import { combineReducers } from 'redux';

import audioReducer from './audio';
import settingsReducer from './settings';

const rootReducer = combineReducers({
  audio: audioReducer,
  settings: settingsReducer
});

export default rootReducer;