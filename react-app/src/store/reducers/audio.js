import actionTypes from '../types';

const initialState = {
  list: [
    { key: '1', artist: 'test', name: 'test', duration: 10, progress: 0 }
  ],
  error: null
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.audio.UPLOAD_LIST: {
      action.payload.forEach(el => {
        el.progress = 0;

        return el;
      });

      return {
        ...state,
        list: action.payload
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