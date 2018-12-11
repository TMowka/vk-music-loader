import { combineReducers } from 'redux';

import audioReducer from './audio';

const rootReducer = combineReducers({
  audio: audioReducer
});

export default rootReducer;