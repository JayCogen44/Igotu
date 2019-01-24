/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import CardsComponent from '../components/CardsComponent.jsx'
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import ItemForm from '../components/ItemForm.jsx'
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  cards: store.cards,
  currentUserID: store.cards.user.id,
  showModal: store.convos.showModal
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
  },
  postConvo: (convoObj) => {
    dispatch(actions.postConvo(convoObj))
  } 
});

class CardsContainer extends Component {
  constructor(props) {
    super(props);

  }

  handleConvoCreate = (convoObj) => {
    console.log('convoObj from handle', convoObj);
    this.props.postConvo(convoObj);
    this.props.history.push('/messages');
  }
 
  componentWillMount() {
    this.props.fetchAllItems();
  }

  render() {
    console.log(this.props.cards);
    return (
      <div>
        <CardsComponent
          items={this.props.cards.items}
          fetchFlag={this.props.cards.fetching}
          loading={this.props}
          handleConvoCreate={this.handleConvoCreate}
          currentUserID={this.props.currentUserID}
        />
        <ItemForm addItem={this.props.addItem} showModal={this.props.showModal} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardsContainer));