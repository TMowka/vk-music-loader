import audioActions from './store/actions/audio';
import downloadActions from './store/actions/donwload';
import settingsActions from './store/actions/settings';
import electronActionTypes from './electronActionTypes';

const { ipcRenderer } = window.require('electron');

const registerEventsListeners = dispatch => {
  // audio
  ipcRenderer.on(electronActionTypes.EtoR.AUDIO_GET,
    (event, audioList) => audioActions.onGet(audioList)(dispatch));

  // download
  ipcRenderer.on(electronActionTypes.EtoR.DOWNLOAD_START,
    (event, title) => downloadActions.onDownloadStart(title)(dispatch));
  ipcRenderer.on(electronActionTypes.EtoR.DOWNLOAD_PROGRESS,
    (event, data) => downloadActions.onDownloadProgress(data.title, data.progress)(dispatch));
  ipcRenderer.on(electronActionTypes.EtoR.DOWNLOAD_COMPLETE,
    () => downloadActions.onDownloadComplete()(dispatch));

  // settings
  ipcRenderer.on(electronActionTypes.EtoR.SETTINGS_GET,
    (event, data) => settingsActions.onGet(data)(dispatch));
};

export default {
  registerEventsListeners
};