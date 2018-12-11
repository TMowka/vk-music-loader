import actionTypes from '../types';

const initialState = {
  list: [
    { id: '1', selected: false, duration: 190, artist: 'Linkin Park', name: 'Numb', progress: 10 },
    { id: '2', selected: false, duration: 120, artist: 'Evanescence', name: 'Live', progress: 10 },
    { id: '3', selected: false, duration: 134, artist: 'Evanescence', name: 'Live', progress: 10 },
    { id: '4', selected: false, duration: 120, artist: 'Evanescence', name: 'Live', progress: 10 },
    { id: '5', selected: false, duration: 123, artist: 'Evanescence', name: 'Live', progress: 10 },
    { id: '6', selected: false, duration: 1200, artist: 'Evanescence', name: 'Live', progress: 10 }
  ]
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

    default:
      return state;
  }
};

export default audioReducer;