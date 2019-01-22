import React from 'react';

const MessagesComponent = (props) => {
  console.log(props.currentConvo);
  const messages = props.messages.filter((message) => message.convoID === props.currentConvo)
    .map((message, i) => <div key={i}> {message.userSent} : {message.text}</div>)

  return (
    <div className="messages-component">
      {messages}
    </div>
  )
}

export default MessagesComponent;