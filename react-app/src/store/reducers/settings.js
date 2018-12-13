import actionTypes from '../types';

const initialState = {
  data: {},
  error: null
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.settings.GET: {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    }

    case actionTypes.settings.FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default settingsReducer;