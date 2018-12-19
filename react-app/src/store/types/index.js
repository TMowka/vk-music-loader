import audioActionTypes from './audio';
import settingsActionTypes from './settings';
import downloadActionTypes from './download';
import playerActionTypes from './player';

const actionTypes = {
  audio: audioActionTypes,
  download: downloadActionTypes,
  settings: settingsActionTypes,
  player: playerActionTypes
};

export default actionTypes;