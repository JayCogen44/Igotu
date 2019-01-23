import React from 'react';

const ConvosComponent = (props) => {
  console.log(props);
  const convos = props.convos.map((convo) => {
    return (
      <div key={convo.id} onClick={() => props.handleConvoChange(convo.id)}>
        <h5>{convo.owner} > {convo.renter}</h5>
        <p>{convo.item_name}</p>
        <p>{convo.created_at}</p>
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