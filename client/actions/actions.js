import * as types from '../constants/actionTypes';

export const fetchItemsStart = () => ({
  type: types.GET_ALL_ITEMS_START
});

export const fetchedItems = resp => ({
  type: types.GET_ALL_ITEMS,
  payload: resp
});

export const fetchError = err => ({
  type: types.GET_ALL_ITEMS_ERR,
  payload: err
});

export const searchValueChange = value => ({
  type: types.SEARCH_BOX_CHANGE,
  payload: value
});

export const showConvos = convos => ({
  type: types.SHOW_CONVOS,
  payload: convos
});

export const showConvoMessages = convoObj => ({
  type: types.SHOW_CONVO_MESSAGES,
  payload: convoObj
});

export const addOneMessageToCurrentMessages = message => ({
  type: types.ADD_ONE_MESSAGE,
  payload: message
});

export const toggleAddItemModal = () => ({
  type: types.TOGGLE_MODAL
});

export const fetchItemsData = () => dispatch => {
  dispatch(fetchItemsStart());
  fetch('api/allItems')
    .then(response => response.json())
    .then(data => dispatch(fetchedItems(data)))
    .catch(() => dispatch(fetchError));
};

export const fetchSearchedItems = search => dispatch => {
  dispatch(fetchItemsStart());
  fetch(`api/search/${search}`)
    .then(response => response.json())
    .then(data => dispatch(fetchedItems(data)))
    .catch(() => dispatch(fetchError));
};

export const fetchCategoryItems = category => dispatch => {
  dispatch(fetchItemsStart());
  fetch(`api/category/${category}`)
    .then(response => response.json())
    .then(data => dispatch(fetchedItems(data)))
    .catch(() => dispatch(fetchError));
};

export const addItem = userObj => dispatch => {
  dispatch(fetchItemsStart());
  fetch(`api/addItem`, {
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(userObj)
  })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: types.ADDED_ITEM,
        payload: data
      });
      dispatch(toggleAddItemModal());
    })
    .catch(() => dispatch(fetchError));
};

/**
 * =======================
 * ==== CONVO ACTIONS ====
 * =======================
 */

export const getConvos = () => (dispatch, getState) => {
  const userID = getState().cards.user.id;
  console.log('userID', userID)
  fetch(`api/convos/${userID}`)
    .then(response => response.json())
    .then(convos => {
      dispatch(showConvos(convos));
      dispatch(getMessagesForAConvo(convos[0].id));
    })
    .catch(() => dispatch(fetchError));
}

export const getMessagesForAConvo = (convoID) => (dispatch, getState) => {
  fetch(`api/messages/${convoID}`)
    .then(response => response.json())
    .then(messages => dispatch(showConvoMessages({ messages, convoID })))
    .catch((err) => dispatch(fetchError));
}

export const postConvo = (convoObj) => (dispatch, getState) => {
  console.log("called", convoObj);
  fetch(`api/addConvo`, {
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(convoObj)
  })
    .then(response => response.json())
    .then(convo => console.log('convoCreated', convo))
    .catch(() => dispatch(fetchError));
}

export const postAMessageToConvo = (messageText) => (dispatch, getState) => {
  const userID = getState().cards.user.id;
  const convoID = getState().convos.currentConvoID;
  const body = {
    user_sent_id: userID,
    convo_id: convoID,
    message: messageText,
    create_at: new Date()
  }
  fetch(`api/addMessage`, {
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    //.then(message => dispatch(addOneMessageToCurrentMessages(message)))
    .catch(() => dispatch(fetchError));
}
