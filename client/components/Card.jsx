import React from 'react';

// class Card extends Component {
//   render() {
//     return (
//       <div id={this.props.id}>
//         <p>{this.props.itemName}</p>
//       </div>
//     );
//   }
// }

const styleString = `background-image: url({props.info.photo})`

const Card = (props) => {
    const styles = { backgroundImage: 'url(' + props.info.photo + ')', }
    return (
        <div className="card">
            <div className="card-container">
                <div className="card-image" style={styles}></div>
                <div className="title-container">
                    <p className="title">{props.info.item_name}</p><span className="subtitle">${props.info.price}</span>
                </div>
            </div>

            <div className="content">
                <p style={{ 'marginBottom': '0px' }}>{props.info.item_details}</p>
                <button className='send-message-button' onClick={() => props.handleConvoCreate({ item_id: props.item_id, user_owner_id: props.user_owner_id, user_renter_id: props.user_renter_id })}>Send Message</button>
            </div>
        </div>
    )
};

export default Card;
