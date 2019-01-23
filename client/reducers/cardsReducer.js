/* eslint-disable consistent-return */
import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  user: {
    name: '',
    email: '',
    id: 1
  },
  cards: [],
  modalStatus: false,
  loggedIn: false,
  fetching: false,
  fetched: false,
  searchBoxValue: 'search'
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state
      };
    case types.SEARCH:
      return {
        ...state
      };
    case types.GET_ALL_ITEMS_START:
      return {
        ...state,
        fetching: true,
        fetched: false
      };
    case types.GET_ALL_ITEMS:
      return {
        ...state,
        items: action.payload,
        fetching: false,
        fetched: true
      };
    case types.SEARCH_BOX_CHANGE:
      return {
        ...state,
        searchBoxValue: action.payload
      };
    case types.ADDED_ITEM:
      const newItems = state.items.slice();
      newItems.push(action.payload);
      return {
        ...state,
        items: newItems
      }
    default:
      return state;
  }
};

export default cardsReducer;