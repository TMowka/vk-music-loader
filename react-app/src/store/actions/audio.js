import actionTypes from '../types';

const _audioToggleSelect = id => ({
  type: actionTypes.audio.AUDIO_TOGGLE_SELECT,
  payload: id
});
const _audioToggleSelectAll = state => ({
  type: actionTypes.audio.AUDIO_TOGGLE_SELECT_ALL,
  payload: state
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

export default {
  audioToggleSelect,
  audioToggleSelectAll
};