import actionTypes from '../types';

const initialiState = {
  title: '',
  progressTitle: '',
  progress: -1,
  error: null
};

const downloadReducer = (state = initialiState, action) => {
  switch (action.type) {
    case actionTypes.download.START: {
      return {
        ...state,
        title: action.payload,
        progress: 0
      };
    }

    case actionTypes.download.PROGRESS: {
      return {
        ...state,
        progressTitle: action.payload.title,
        progress: action.payload.progress
      };
    }

    case actionTypes.download.COMPLETE: {
      return {
        ...state,
        title: '',
        progressTitle: '',
        progress: -1
      };
    }

    case actionTypes.download.FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default downloadReducer;