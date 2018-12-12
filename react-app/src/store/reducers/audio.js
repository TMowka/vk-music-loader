import actionTypes from '../types';

const initialState = {
  list: [],
  error: null,
  pending: false
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.audio.AUDIO_TOGGLE_SELECT: {
      const list = [...state.list];
      const index = list.findIndex(el => el.id === action.payload);
      list[index].selected = !list[index].selected;

      return {
        ...state,
        list
      };
    }

    case actionTypes.audio.AUDIO_TOGGLE_SELECT_ALL: {
      const list = [...state.list];
      list.forEach(el => el.selected = action.payload);

      return {
        ...state,
        list
      };
    }

    case actionTypes.audio.AUDIO_UPLOAD_LIST_PENDING: {
      return {
        ...state,
        pending: true
      };
    }

    case actionTypes.audio.AUDIO_UPLOAD_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    }

    case actionTypes.FAILURE: {
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