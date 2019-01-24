/* eslint-disable no-unused-expressions */
/* eslint-disable react/self-closing-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoreInfoComponent from '../components/MoreInfoComponent.jsx'
import { Route, Link, withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  cards: store.cards
});

// need to add all our action creators here
const mapDispatchToProps = dispatch => ({
  fetchAllItems: () => {
    dispatch(actions.fetchItemsData());
  },
  fetchSearchedItems: value => {
    dispatch(actions.fetchSearchedItems(value));
  },
  searchBoxChange: value => {
    dispatch(actions.searchValueChange(value));
  },
  fetchCategory: value => {
    dispatch(actions.fetchCategoryItems(value));
  }
});

class MoreInfoContainer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <MoreInfoComponent 

        />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreInfoContainer));