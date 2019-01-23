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
      inputText: ''
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
  }

  componentDidMount() {
    this.props.getConvos();
  }

  render() {
    return (
      <div className="messages-container">
        <ConvosComponent
          convos={this.props.convos}
          handleConvoChange={this.handleConvoChange}
        />
        <MessagesComponent 
          messagesArr={this.props.messagesArr}
          handlePostMessage={this.handlePostMessage}
          handleChange={this.handleChange}
          inputText={this.state.inputText}
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