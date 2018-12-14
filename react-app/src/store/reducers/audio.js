import actionTypes from '../types';

const initialState = {
  list: [],
  error: null
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.audio.GET: {
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