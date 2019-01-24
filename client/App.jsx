/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import NavigationContainer from './containers/NavigationContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <NavigationContainer />
          <MainContainer />
        </div>
      </Router>
    );
  }
}

export default App;
