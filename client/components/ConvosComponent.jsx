import React from 'react';

const ConvosComponent = (props) => {
  console.log(props);
  const convos = props.convos.map((convo) => {
    const time = convo.created_at.split('T')[0];
    return (
      <div key={convo.id} className={props.currentConvoID === convo.id ? 'active' : ''} onClick={() => props.handleConvoChange(convo.id)}>
        <h5>{convo.owner} > {convo.renter}</h5>
        <p style={{ 'textTransform': 'uppercase' }}>{convo.item_name}</p>
        <p style={{ 'fontSize': '12px' }}>{time}</p>
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