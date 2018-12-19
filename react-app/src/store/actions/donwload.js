import actionTypes from '../types';
import electronActionTypes from '../../electronActionTypes';

const { ipcRenderer } = window.require('electron');

const _downloadStart = title => ({ type: actionTypes.download.START, payload: title });
const _downloadProgress = (title, progress) => ({
  type: actionTypes.download.PROGRESS,
  payload: { title, progress }
});
const _downloadComplete = () => ({ type: actionTypes.download.COMPLETE });

const _failure = error => ({ type: actionTypes.download.FAILURE, payload: error });

const fireDownload = key => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.DOWNLOAD, key);
  } catch (error) {
    console.warn('[actions.download] fireDownload');
    dispatch(_failure(error));
  }
};

const fireDownloadAll = () => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.DOWNLOAD_ALL);
  } catch (error) {
    console.warn('[actions.download] fireDownloadAll');
    dispatch(_failure(error));
  }
};

const onDownloadStart = title => dispatch => {
  try {
    dispatch(_downloadStart(title));
  } catch (error) {
    console.warn('[actions.download] onDownloadStart');
    dispatch(_failure(error));
  }
};

const onDownloadProgress = (title, progress) => dispatch => {
  try {
    dispatch(_downloadProgress(title, progress));
  } catch (error) {
    console.warn('[actions.download] onDownloadProgress');
    dispatch(_failure(error));
  }
};

const onDownloadComplete = () => dispatch => {
  try {
    dispatch(_downloadComplete());
  } catch (error) {
    console.warn('[actions.download] onDownloadComplete');
    dispatch(_failure(error));
  }
};

export default {
  fireDownload,
  fireDownloadAll,

  onDownloadStart,
  onDownloadProgress,
  onDownloadComplete
};