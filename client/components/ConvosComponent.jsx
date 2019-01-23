import React from 'react';

const ConvosComponent = (props) => {
  const convos = props.convos.map((convo) => {
    return (
      <div key={convo.id} onClick={() => props.handleConvoChange(convo.id)}>
        <h5>{convo.user_owner_id} > {convo.user_renter_id}</h5>
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