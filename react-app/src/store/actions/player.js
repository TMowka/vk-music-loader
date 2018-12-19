import actionTypes from '../types';

const _play = url => ({ type: actionTypes.player.PLAY, payload: url });
const _stop = () => ({ type: actionTypes.player.STOP });

const _failure = error => ({ type: actionTypes.player.FAILURE, payload: error });

const play = key => (dispatch, getState) => {
  try {
    const audio = getState().audio.list.find(audio => audio.key === key);
    dispatch(_play(audio));
  } catch (error) {
    console.warn('[actions.player] play');
    dispatch(_failure(error));
  }
};

const stop = () => dispatch => {
  try {
    dispatch(_stop());
  } catch (error) {
    console.warn('[actions.player] stop');
    dispatch(_failure(error));
  }
};

export default {
  play,
  stop
};