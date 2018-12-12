import audioActions from './store/actions/audio';
const { ipcRenderer } = window.require('electron');

const registerEventsListeners = () => {
  ipcRenderer.on('e-to-r-audio-upload-list', audioActions.audioUploadList);
};

export default {
  registerEventsListeners
};