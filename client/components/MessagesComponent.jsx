import React from 'react';

const MessagesComponent = (props) => {
  const messagesArr = props.messagesArr.map((message, i) => (
    <div key={message.id}> {message.user_name} : {message.message}</div>
  )
  );


  return (
    <div className="messages-component">
      <div id='messages' className='messages-wrapper'>
        {messagesArr}
      </div>
      <form className='message-input' onSubmit={(e) => { e.preventDefault(); props.handlePostMessage() }}>
        <input id="inputText" value={props.inputText} onChange={props.handleChange}></input>
        <button style={{ 'fontSize': '36px' }}>+</button>
      </form>
    </div>
  )
}

export default MessagesComponent;