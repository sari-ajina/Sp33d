import React, { useContext, useState } from 'react';
import Axios from 'axios';
import UserContext from '../../Contexts/UserContext';

function Item() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [userId, setUserId] = useState('');
  const {username} = useContext(UserContext);

  const [itemStatus, setItemStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      title: title,
      description: description,
      category: category,
      price: price, 
      userId: username //retrieving the username val
    };

    Axios.post('http://localhost:3001/items', newItem).then(
    (response) => {
      console.log(response.data);
      if(response.data.message){
          setItemStatus(response.data.message);
      }else{
          setItemStatus("item: " + title + " posted");
          console.log("item status: ", itemStatus)
      }

    })

  };

  return (
    <div>
      <h1>Logged in as: {username}</h1>
      <h2>Insert Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <br></br>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <br></br>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <br></br>
          {/* ask chatGPT how to turn this input with a select with the options Sedan, SUV, Convertible, Sport and Retro, and being able to set the selcted value to setCategory */}
          {/* <input type="text" value={category} onChange={e => setCategory(e.target.value)} required /> */}
          <select onChange={e => setCategory(e.target.value)} required>
            <option value="-1"></option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Convertible">Convertible</option>
            <option value="Sport">Sport</option>
            <option value="Retro">Retro</option>
          </select>
        </div>
        <div>
          <label>Price:</label>
          <br></br>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
        <h1>{itemStatus}</h1>
    </div>
  );
}

export default Item;