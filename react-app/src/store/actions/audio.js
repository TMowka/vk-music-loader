import actionTypes from '../types';
import electronActionTypes from '../../electronActionTypes';

const { ipcRenderer } = window.require('electron');

const _audioUploadList = audioList => ({
  type: actionTypes.audio.UPLOAD_LIST,
  payload: audioList
});
const _failure = error => ({ type: actionTypes.audio.FAILURE, payload: error });

const fireAudioUploadList = () => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.AUDIO_UPLOAD_LIST);
  } catch (error) {
    console.warn('[actions.audio] fireAudioUploadList');
    dispatch(_failure(error));
  }
};

const onAudioUploadList = audioList => dispatch => {
  try {
    dispatch(_audioUploadList(audioList));
  } catch (error) {
    console.warn('[actions.audio] onAudioUploadList');
    dispatch(_failure(error));
  }
};

export default {
  fireAudioUploadList,
  onAudioUploadList
};