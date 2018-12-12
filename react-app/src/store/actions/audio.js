import actionTypes from '../types';
const { ipcRenderer } = window.require('electron');

const _audioToggleSelect = id => ({
  type: actionTypes.audio.AUDIO_TOGGLE_SELECT,
  payload: id
});
const _audioToggleSelectAll = state => ({
  type: actionTypes.audio.AUDIO_TOGGLE_SELECT_ALL,
  payload: state
});
const _audioUploadListPending = () => ({
  type: actionTypes.audio.AUDIO_UPLOAD_LIST_PENDING
});
const _audioUploadListSuccess = audioList => ({
  type: actionTypes.audio.AUDIO_UPLOAD_LIST_SUCCESS,
  payload: audioList
});
const _failure = error => ({ type: actionTypes.FAILURE, payload: error });

const audioToggleSelect = id => dispatch => {
  try {
    dispatch(_audioToggleSelect(id));
  } catch (error) {
    dispatch(_failure(error));
  }
};

const audioToggleSelectAll = state => dispatch => {
  try {
    dispatch(_audioToggleSelectAll(state));
  } catch (error) {
    dispatch(_failure(error));
  }
};

const audioSendListPath = path => dispatch => {
  try {
    dispatch(_audioUploadListPending());
    ipcRenderer.send('r-to-e-audio-upload-list', path);
  } catch (error) {
    dispatch(_failure(error));
  }
};

const audioUploadList = (event, data) => dispatch => {
  try {
    console.log(data);
    dispatch(_audioUploadListSuccess(data));
  } catch (error) {
    dispatch(_failure(error));
  }
};

export default {
  audioToggleSelect,
  audioToggleSelectAll,
  audioSendListPath,
  audioUploadList
};