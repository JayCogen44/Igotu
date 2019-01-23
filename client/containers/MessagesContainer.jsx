import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import * as actions from '../actions/actions';
import ConvosComponent from '../components/ConvosComponent.jsx'
import MessagesComponent from '../components/MessagesComponent.jsx'
import { Route, Link, withRouter } from 'react-router-dom';

const socket = io('http://192.168.0.219:3000', { reconnection: true });


/**************** WEB SOCKETS *****************/

socket.on('connect', () => {
  console.log(`Connected. ID: ${socket.id}`)
  // const data = { stuff: 'whatever' }
  // const receiver = resp => {
  //   console.log('Server response:')
  //   console.log(resp)
  // }
  socket.emit('client-connect', 'Hey from client');
  socket.on('server-connect', (data) => {
    console.log(data);
  })
});

/*************** /WEB SOCKETS *****************/


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
  },
  addNewMessage: (message) => {
    dispatch(actions.addOneMessageToCurrentMessages(message));
  }
});



class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://192.168.0.219:5000');
    this.state = {
      inputText: ''
    }
  }

  connectToSocket = (connect) => {
    if (connect === true) {
      this.socket.on('connect', () => {

        //const socket = io('http://192.168.0.219:3000');
        console.log(`Connected. ID: ${this.socket.id}`)
        this.socket.emit('client-connect', 'Hey from client');
        this.socket.on('server-connect', (data) => {
          console.log(data);
        })
        this.socket.on('message', (message) => {
          console.log('message from io: ', message);
          this.props.addNewMessage(message);
        });
      });
    } else {
      console.log('unmounting');
      this.socket.disconnect(true);
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
    this.setState({ ...this.state, inputText: '' });
  }

  handleConvoChange = (convoID) => {
    this.props.getMessagesForAConvo(convoID);
  }

  componentDidMount() {
    this.props.getConvos();
    this.connectToSocket(true);
  }

  componentWillUnmount() {
    this.connectToSocket(false);
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessagesContainer));
