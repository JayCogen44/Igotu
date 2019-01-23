/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import CardsComponent from '../components/CardsComponent.jsx'
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import ItemForm from '../components/ItemForm.jsx'
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  cards: store.cards
});

// need to add all our action creators here
const mapDispatchToProps = dispatch => ({
  fetchAllItems: () => {
    dispatch(actions.fetchItemsData());
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

class CardsContainer extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.fetchAllItems();
  }

  render() {
    return (
      <div>
        <CardsComponent 
          items={this.props.cards.items}
          fetchFlag={this.props.cards.fetching}
          loading={this.props}
        />
        <ItemForm addItem={this.props.addItem} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardsContainer));