import audioActions from './store/actions/audio';
import settingsActions from './store/actions/settings';
import electronActionTypes from './electronActionTypes';
import { store } from './index';

const { ipcRenderer } = window.require('electron');

const registerEventsListeners = () => {
  // audio
  ipcRenderer.on(electronActionTypes.EtoR.AUDIO_GET,
    (event, audioList) => audioActions.onGet(audioList)(store.dispatch));
  ipcRenderer.on(electronActionTypes.EtoR.AUDIO_DOWNLOAD_START,
    () => audioActions.onDownloadStart()(store.dispatch));
  ipcRenderer.on(electronActionTypes.EtoR.AUDIO_DOWNLOAD_PROGRESS,
    (event, progress) => audioActions.onDownloadProgress(progress)(store.dispatch));
  ipcRenderer.on(electronActionTypes.EtoR.AUDIO_DOWNLOAD_COMPLETE,
    () => audioActions.onDownloadComplete()(store.dispatch));

  // settings
  ipcRenderer.on(electronActionTypes.EtoR.SETTINGS_GET,
    (event, data) => settingsActions.onGet(data)(store.dispatch));
};

export default {
  registerEventsListeners
};