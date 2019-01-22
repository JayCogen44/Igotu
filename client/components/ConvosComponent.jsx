import React from 'react';

const ConvosComponent = (props) => {
  const convos = props.convos.map((convo) => {
    return (
      <div key={convo.itemID} onClick={() => props.handleConvoChange(convo.itemID)}>
        <h5>{convo.userCreated} > {convo.userInterested}</h5>
        <p>{convo.date.toString()}</p>
      </div>
    )
  });

  return (
    <div className="convos-component">
      {convos}
    </div>
  )
}

export default ConvosComponent;