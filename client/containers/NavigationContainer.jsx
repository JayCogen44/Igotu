/* eslint-disable no-unused-expressions */
/* eslint-disable react/self-closing-comp */
import React, { Component } from 'react';
import SubNavigation from './SubNavContainer.jsx'
import { connect } from 'react-redux';
import NavigationComponent from '../components/NavigationComponent.jsx'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
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

class NavigationContainer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="navdiv">
        <NavigationComponent 
          fetchSearchedItems={this.props.fetchSearchedItems}
          fetchCategory={this.props.fetchCategory}
          searchValue={this.props.cards.searchBoxValue}
          searchBoxChange={this.props.searchBoxChange}
        />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationContainer));