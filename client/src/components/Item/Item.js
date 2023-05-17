import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import UserContext from '../../Contexts/UserContext';
import NavbarStyle from '../Bootstrap/NavbarStyle';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

function Item() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [userId, setUserId] = useState('');
  // const {username} = useContext(UserContext);

  const [itemStatus, setItemStatus] = useState("");
  const user = localStorage.getItem("username");


  useEffect(() =>{
    // const user = localStorage.getItem("username");
    console.log(user)
    // console.log(username)
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      title: title,
      description: description,
      category: category,
      price: price, 
      userId: user //retrieving the username val
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
      <NavbarStyle></NavbarStyle>
      <h1 className='welcome'>Logged in as: {user}</h1>
      <Row sm={1} md={1} lg={1} style={{margin: "12px"}} className="g-4">
        <Col>
          <Card border='success'>
              <Card.Body>
                  <Form onSubmit={handleSubmit}>
                      <Card.Title>
                          <Card.Header>
                              Insert Item:
                          </Card.Header>
                      </Card.Title>
                      <Card.Text>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Title"
                          className="mb-3"
                          value={title} 
                          onChange={e => setTitle(e.target.value)} 
                          required
                          >
                          <Form.Control type="text" placeholder='Title'/>
                        </FloatingLabel>
                      </Card.Text>
                      <Card.Text>
                          Category:
                          <Form.Select onChange={e => setCategory(e.target.value)} required>
                            <option></option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Convertible">Convertible</option>
                            <option value="Sport">Sport</option>
                            <option value="Retro">Retro</option>
                          </Form.Select>
                          <br></br>
                          <FloatingLabel 
                              value={description} 
                              onChange={e => setDescription(e.target.value)} 
                              required
                              controlId="floatingTextarea2" 
                              label="Description"
                          >
                              <Form.Control
                              as="textarea"
                              placeholder="Write a Description here"
                              style={{ height: '100px' }}
                              />
                          </FloatingLabel>
                      </Card.Text>
                      <Card.Text>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Price"
                          className="mb-3"
                          value={price} 
                          onChange={e => setPrice(e.target.value)} 
                          required
                          >
                          <Form.Control type="number" placeholder='Price'/>
                        </FloatingLabel>
                      </Card.Text>
                      <Card.Footer>
                          <Button type="submit" variant="outline-success">Submit Item</Button>
                      </Card.Footer>
                  </Form>
              </Card.Body>
          </Card>
        </Col>
      </Row>
      <h1 className='welcome'>{itemStatus}</h1>
    </div>
  );
}

export default Item;