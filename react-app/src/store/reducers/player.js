import actionTypes from '../types';

const initialState = {
  audio: null,
  error: null
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.player.PLAY: {
      return {
        ...state,
        audio: action.payload
      };
    }

    case actionTypes.player.STOP: {
      return {
        ...state,
        audio: null
      };
    }

    case actionTypes.player.FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default playerReducer;