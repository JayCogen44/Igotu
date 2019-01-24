/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import MessagesContainer from './MessagesContainer.jsx';
import CardsContainer from './CardsContainer.jsx';
import MoreInfoContainer from './MoreInfoContainer.jsx';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route 
            exact path="/"
            component={CardsContainer}
          />
          <Route 
            exact path="/messages"
            component={MessagesContainer}
          />
          <Route 
            exact path="/item/:id"
            component={MoreInfoContainer}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(MainContainer));
