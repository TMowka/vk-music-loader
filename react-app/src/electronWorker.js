import audioActions from './store/actions/audio';
import settingsActions from './store/actions/settings';
import electronActionTypes from './electronActionTypes';
import { store } from './index';

const { ipcRenderer } = window.require('electron');

const registerEventsListeners = () => {
  ipcRenderer.on(electronActionTypes.EtoR.AUDIO_UPLOAD_LIST,
    (event, audioList) => audioActions.onAudioUploadList(audioList)(store.dispatch));
  ipcRenderer.on(electronActionTypes.EtoR.SETTINGS_GET,
    (event, data) => settingsActions.onGet(data)(store.dispatch));
};

export default {
  registerEventsListeners
};