import { combineReducers } from 'redux';

import audioReducer from './audio';
import downloadReducer from './download';
import settingsReducer from './settings';
import playerReducer from './player';

const rootReducer = combineReducers({
  audio: audioReducer,
  download: downloadReducer,
  settings: settingsReducer,
  player: playerReducer
});

export default rootReducer;