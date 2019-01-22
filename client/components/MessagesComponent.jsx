import React from 'react';

const MessagesComponent = (props) => {
  console.log(props);
  const messages = props.messages.filter((message) => message.convoID === props.currentConvoID)
    .map((message, i) => <div key={i}> {message.userSent} : {message.text}</div>)

  return (
    <div>
      <div className="messages-component">
        {messages}
      </div>
      <input id="inputText" value={props.inputText} onChange={props.handleChange}></input>
      <button onClick={props.handlePostMessage}>Send</button>
    </div>
  )
}

export default MessagesComponent;