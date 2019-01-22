import React, { Component } from 'react';

const ItemForm = (props) => {

  return (
    <div id="modal-form" style={{ width: '500px', margin: '0 auto 30px' }}>
      <h3>Add an item</h3>
      <form id='addItemForm'>
        Item Name<br></br>
        <input type="text" name='name'></input>
        Description<br></br>
        <textarea name='desc'></textarea>
        Price<br></br>
        <input type="number" name='price'></input>
        Image Url<br></br>
        <input type="url" name='url'></input>
        <button onClick={props.addItem}>Add Item</button>
      </form>
    </div>
  )

}

export default ItemForm;