import * as types from '../constants/actionTypes';


const initialState = {
  convosArr: [],
  messagesArr: [],
  currentConvoID: 1
};

const convosReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SHOW_CONVOS:
      return {
        ...state,
        convosArr: action.payload
      };
    case types.SHOW_CONVO_MESSAGES:
      return {
        ...state,
        messagesArr: action.payload
      }
    case types.ADD_ONE_MESSAGE:
      return {
        ...state,
        messagesArr: [ ...state.messagesArr, action.payload]
      }
    default:
      return state;
      
  }
}

export default convosReducer;
