import actionTypes from '../types';

const initialState = {
  list: [],
  downloadProgress: -1,
  error: null
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.audio.GET: {
      return {
        ...state,
        list: action.payload
      };
    }

    case actionTypes.audio.DOWNLOAD_START: {
      return {
        ...state,
        downloadProgress: 0
      };
    }

    case actionTypes.audio.DOWNLOAD_PROGRESS: {
      return {
        ...state,
        downloadProgress: action.payload
      };
    }

    case actionTypes.audio.DOWNLOAD_COMPLETE: {
      return {
        ...state,
        downloadProgress: -1
      };
    }

    case actionTypes.audio.FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default audioReducer;