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
                <p>{props.info.item_details}</p>

            </div>
        </div>
    )
};

export default Card;
