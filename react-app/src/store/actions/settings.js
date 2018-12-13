import actionTypes from '../types';
import electronActionTypes from '../../electronActionTypes';

const { ipcRenderer } = window.require('electron');

const _get = value => ({
  type: actionTypes.settings.GET,
  payload: value
});
const _failure = error => ({
  type: actionTypes.settings.FAILURE,
  payload: error
});

const fireGet = () => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.SETTINGS_GET);
  } catch (error) {
    console.warn('[actions.settings] fireGet');
    dispatch(_failure(error));
  }
};

const onGet = data => dispatch => {
  try {
    dispatch(_get(data));
  } catch (error) {
    console.warn('[actions.settings] onGet');
    dispatch(_failure(error));
  }
};

const fireSet = (key, val) => dispatch => {
  try {
    ipcRenderer.send(electronActionTypes.RtoE.SETTINGS_SET, { key, val });
  } catch (error) {
    console.warn('[actions.settings] fireSet');
    dispatch(_failure(error));
  }
};

export default {
  fireGet,
  onGet,
  fireSet
};