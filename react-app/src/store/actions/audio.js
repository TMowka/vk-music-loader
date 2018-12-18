import actionTypes from '../types';
import electronActionTypes from '../../electronActionTypes';

const { ipcRenderer } = window.require('electron');

const _get = audioList => ({ type: actionTypes.audio.GET, payload: audioList });
const _downloadStart = () => ({ type: actionTypes.audio.DOWNLOAD_START });
const _downloadProgress = progress => ({
  type: actionTypes.audio.DOWNLOAD_PROGRESS,
  payload: progress
});
const _downloadComplete = () => ({ type: actionTypes.audio.DOWNLOAD_COMPLETE });
const _filterChange = filter => ({ type: actionTypes.audio.FILTER_CHANGE, payload: filter });

const _failure = error => ({ type: actionTypes.audio.FAILURE, payload: error });

const fireExport = () => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.AUDIO_EXPORT);
  } catch (error) {
    console.warn('[actions.audio] fireExport');
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
    dispatch(_filterChange(''));
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

const onDownloadStart = () => dispatch => {
  try {
    dispatch(_downloadStart());
  } catch (error) {
    console.warn('[actions.audio] onDownloadStart');
    dispatch(_failure(error));
  }
};

const onDownloadProgress = progress => dispatch => {
  try {
    dispatch(_downloadProgress(progress));
  } catch (error) {
    console.warn('[actions.audio] onDownloadProgress');
    dispatch(_failure(error));
  }
};

const onDownloadComplete = () => dispatch => {
  try {
    dispatch(_downloadComplete());
  } catch (error) {
    console.warn('[actions.audio] onDownloadComplete');
    dispatch(_failure(error));
  }
};

const filterChange = filter => dispatch => {
  try {
    dispatch(_filterChange(filter));
  } catch (error) {
    console.warn('[actions.audio] filterChange');
    dispatch(_failure(error));
  }
};

const fireDownloadAll = () => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.AUDIO_DOWNLOAD_ALL);
  } catch (error) {
    console.warn('[actions.audio] fireDownloadAll');
    dispatch(_failure(error));
  }
};

export default {
  fireExport,
  fireImport,
  onGet,
  fireSynchronization,
  fireDownload,
  onDownloadStart,
  onDownloadProgress,
  onDownloadComplete,
  filterChange,
  fireDownloadAll
};