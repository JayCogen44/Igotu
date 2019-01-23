import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import ConvosComponent from '../components/ConvosComponent.jsx'
import MessagesComponent from '../components/MessagesComponent.jsx'

const mapStateToProps = store => ({
  convos: store.convos.convosArr,
  messagesArr: store.convos.messagesArr,
  currentConvoID: store.convos.currentConvoID
});

const mapDispatchToProps = dispatch => ({
  getConvos: () => {
    dispatch(actions.getConvos());
  },
  getMessagesForAConvo: (convoID) => {
    dispatch(actions.getMessagesForAConvo(convoID));
  },
  postAMessageToConvo: (convoID) => {
    dispatch(actions.postAMessageToConvo(convoID));
  }
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
      inputText: '',
      currentConvoID: 0,
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const newState = this.state;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  };

  handlePostMessage = () => {
    this.props.postAMessageToConvo(this.state.inputText);
    this.setState({ ...this.state, inputText: ''});
  }

  handleConvoChange = (convoID) => {
    this.props.getMessagesForAConvo(convoID);
    // this.setState({currentConvoID: convoID});
  }

  componentDidMount() {
    this.props.getConvos();
  }

  render() {
    return (
      <div className="messages-container">
        <ConvosComponent
          // convos={this.state.convos}
          convos={this.props.convos}
          handleConvoChange={this.handleConvoChange}
        />
        <MessagesComponent 
          // messages={this.state.messages}
          messagesArr={this.props.messagesArr}
          handlePostMessage={this.handlePostMessage}
          handleChange={this.handleChange}
          inputText={this.state.inputText}
          // currentConvoID={this.state.currentConvoID}
          currentConvoID={this.props.currentConvoID}
        />
      </div>
    )
  }
 }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);