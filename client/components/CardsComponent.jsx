/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Card from '../components/Card.jsx';

const uuid = require('uuid/v1');

const CardsComponent = props => {

  const createCard = item => {
    console.log('itemID:', item.id)
    return <Card key={uuid()} item_id={item.id} user_renter_id={props.currentUserID} user_owner_id={item.user_id} info={item} handleConvoCreate={props.handleConvoCreate} />;
  };

  const cards = props.items.map(createCard);

  const cardRows = [];

  let counter = 0;

  for (let i = 0; i <= cards.length / 4; i++) {
    const currentCards = [];

    for (let j = 0; j < 4; j++) {
      currentCards.push(cards[counter]);
      counter++;
    }

    const currentRow = (
      <div className="row" key={uuid()}>
        {' '}
        {currentCards}
      </div>
    );
    cardRows.push(currentRow);
  }

  let Loading;

  if (props.fetchFlag) {
    Loading = (
      <div className="col-fluid">
        <button
          className="animated loading center loading-white loading-right white"
          id="loadButton"
        >
          Loading Data
        </button>
      </div>
    );
  }

  return (
    <div className="card-container">
      {Loading}
      {cardRows}
    </div>
  );
};

export default CardsComponent;


