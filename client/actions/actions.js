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
  type: types.SEARCH_BOX_CHANGE,
  payload: convos
});

export const fetchItemsData = () => dispatch => {
  dispatch(fetchItemsStart());

  fetch('api/allItems')
    .then(response => response.json())
    .then(data => {
      console.log('we got the items');
      dispatch(fetchedItems(data));
    })
    .catch(() => dispatch(fetchError));
};

export const fetchSearchedItems = search => dispatch => {
  dispatch(fetchItemsStart());

  fetch(`api/search/${search}`)
    .then(response => response.json())
    .then(data => {
      console.log('we got the searched items');
      dispatch(fetchedItems(data));
    })
    .catch(() => dispatch(fetchError));
};

export const fetchCategoryItems = category => dispatch => {
  dispatch(fetchItemsStart());

  fetch(`api/category/${category}`)
    .then(response => response.json())
    .then(data => {
      console.log('we got the category items');
      dispatch(fetchedItems(data));
    })
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
      console.log('we added a item');
      dispatch({
        type: types.ADDED_ITEM,
        payload: data
      });
    })
    .catch(() => dispatch(fetchError));
};

export const getConvos = () => (dispatch, getState) => {

  fetch(`api/category/convos`)
    .then(response => response.json())
    .then(convos => {
      console.log('we got the category items');
      dispatch(showConvos(convos))
      // dispatch(fetchedItems(data));
    })
    .catch(() => dispatch(fetchError));
}

// export const searchStart = query => ({
//   type: types.SEARCH,
//   payload: query
// });

// export const login = data => ({
//   type: types.LOGIN,
//   payload: data
// });
