import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import ConvosComponent from '../components/ConvosComponent.jsx'
import MessagesComponent from '../components/MessagesComponent.jsx'

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => ({

});

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convos: [
        {
          userCreated: "Jay",
          userInterested: "Braden",
          itemID: 0,
          date: new Date(),
        },
        {
          userCreated: "Jay",
          userInterested: "Adrian",
          itemID: 1,
          date: new Date(),
        },
        {
          userCreated: "Howard",
          userInterested: "Jay",
          itemID: 2,
          date: new Date(),
        },
      ],
      messages: [
        {
          userSent: "Jay",
          text: 'Yo, you selling the ferrari for the day?',
          convoID: 0,
        },
        {
          userSent: "Braden",
          text: 'Not today, but tomorrow. Did you want it in the morning?',
          convoID: 0,
        },
        {
          userSent: "Jay",
          text: 'Forget it!',
          convoID: 0,
        },
        {
          userSent: "Jay",
          text: 'Still for sale?',
          convoID: 1,
        },
        {
          userSent: "Jay",
          text: 'You still there...?',
          convoID: 1,
        },
        {
          userSent: "Adrian",
          text: 'Nope, sold!!!',
          convoID: 1,
        },
        {
          userSent: "Jay",
          text: 'Shucks',
          convoID: 1,
        },
      ],
      currentConvo: 0,
    }
  }

  handleConvoChange = (id) => {
    this.setState({currentConvo: id});
  }

  render() {
    return (
      <div className="messages-container">
        <ConvosComponent
          convos={this.state.convos}
          handleConvoChange={this.handleConvoChange}
        />
        <MessagesComponent 
          messages={this.state.messages}
          currentConvo={this.state.currentConvo}
        />
      </div>
    )
  }
 }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);