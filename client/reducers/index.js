import { combineReducers } from 'redux';

import cardsReducer from './cardsReducer';
import searchReducer from './searchReducer';
import convosReducer from './convosReducer';

const reducers = combineReducers({
  cards: cardsReducer,
  convos: convosReducer
});

export default reducers;
