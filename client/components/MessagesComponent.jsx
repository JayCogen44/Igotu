import React from 'react';

const MessagesComponent = (props) => {
  const messagesArr = props.messagesArr.map((message, i) => <div key={message.id}> {message.user_sent_id} : {message.message}</div>)
  console.log(props);
  return (
    <div>
      <div className="messages-component">
        {messagesArr}
      </div>
      <input id="inputText" value={props.inputText} onChange={props.handleChange}></input>
      <button onClick={props.handlePostMessage}>Send</button>
    </div>
  )
}

export default MessagesComponent;