/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './NavigationContainer.jsx';
import Cards from './CardsContainer.jsx';
import types from '../constants/actionTypes';
import * as actions from '../actions/actions';
import ItemForm from '../components/ItemForm.jsx';

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
  },
  addItem: event => {
    event.preventDefault();
    const addItemForm = document.getElementById('addItemForm');
    const formData = {
      user_id: 1,
      item_name: addItemForm.elements.name.value,
      item_details: addItemForm.elements.desc.value,
      price: addItemForm.elements.price.value,
      photo: addItemForm.elements.url.value,
    }
    dispatch(actions.addItem(formData))
  }
});

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAllItems();
  }

  render() {
    return (
      <div>
        <div id="navdiv">
          <Navigation
            fetchSearchedItems={this.props.fetchSearchedItems}
            fetchCategory={this.props.fetchCategory}
            searchValue={this.props.cards.searchBoxValue}
            searchBoxChange={this.props.searchBoxChange}
          />
        </div>
        <div id="cardsdiv">
          <Cards
            items={this.props.cards.items}
            fetchFlag={this.props.cards.fetching}
            loading={this.props}
          />
        </div>
        <ItemForm addItem={this.props.addItem} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
