import actionTypes from '../types';
import electronActionTypes from '../../electronActionTypes';

const { ipcRenderer } = window.require('electron');

const _get = audioList => ({ type: actionTypes.audio.GET, payload: audioList });
const _failure = error => ({ type: actionTypes.audio.FAILURE, payload: error });

const fireExport = () => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.AUDIO_EXPORT);
  } catch (error) {
    console.warn('[actions.audio] fireExport');
    dispatch(_failure(error));
  }
};

const fireGet = () => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.AUDIO_GET);
  } catch (error) {
    console.warn('[actions.audio] fireGet');
    dispatch(_failure(error));
  }
};

const fireImport = () => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.AUDIO_IMPORT);
  } catch (error) {
    console.warn('[actions.audio] fireImport');
    dispatch(_failure(error));
  }
};

const onGet = audioList => dispatch => {
  try {
    dispatch(_get(audioList));
  } catch (error) {
    console.warn('[actions.audio] onGet');
    dispatch(_failure(error));
  }
};

const fireSynchronization = () => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.AUDIO_SYNCHRONIZATION);
  } catch (error) {
    console.warn('[actions.audio] fireAudioSynchronization');
    dispatch(_failure(error));
  }
};

const fireDownload = key => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.AUDIO_DOWNLOAD, key);
  } catch (error) {
    console.warn('[actions.audio] fireDownload');
    dispatch(_failure(error));
  }
};

export default {
  fireExport,
  fireImport,
  fireGet,
  onGet,
  fireSynchronization,
  fireDownload
};