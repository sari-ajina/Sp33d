import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Axios from 'axios';

function ModalFilter(props) {

  const [selectedFilter, setSelectedFilter] = useState('');
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  // const [queryResult, setQueryResult] = useState('');
  // const [expensive, setExpensive] = useState(false);
  // const [mostPosts, setMostPosts] = useState(false);
  const [userX, setUserX] = useState('');
  const [userY, setUserY] = useState('');

  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  const [option5, setOption5] = useState(false);
  const [option6, setOption6] = useState(false);
  const [option7, setOption7] = useState(false);
  const [option8, setOption8] = useState(false);
  const [option9, setOption9] = useState(false);
  const [option10, setOption10] = useState(false);

  // const handleFilterChange = (event) => {
  //   setSelectedFilter(event.target.value);
  //   console.log(event.target.value)
  // };

  const handleCategory1Change = (event) => {
    setCategory1(event.target.value);
  };

  const handleCategory2Change = (event) => {
    setCategory2(event.target.value);
  };

  // const handleLabelChange = (event) => {
  //   setExpensive(event.target.checked);
  //   setMostPosts(event.target.checked);
  // };

  const handleUserXChange = (event) => {
    setUserX(event.target.value);
  };

  const handleUserYChange = (event) => {
    setUserY(event.target.value);
  };

  const handleSubmit = async (event) => {
    const inputElement1 = document.getElementById("option10-input1");
    const inputElement2 = document.getElementById("option10-input2");
    
    // Check if the input value is empty
    if (!inputElement1.value || !inputElement2.value) {
      event.preventDefault(); // Prevent form submission
    }

    let query = '';
    console.log(selectedFilter)
    switch (selectedFilter) {
      case 'option1':
        console.log("option1 was selected and submitted")
        query = `SELECT * FROM items i1 WHERE price = (
                SELECT MAX(price) FROM items i2 WHERE i2.category = i1.category
        )`;
        break;
      case 'option2':
        console.log("option2 was selected and submitted")
        query = `SELECT DISTINCT u.username FROM users u
                JOIN items i1 ON u.id = i1.user_id
                JOIN items i2 ON u.id = i2.user_id AND i1.date_posted = i2.date_posted
                WHERE i1.category = '${category1}' AND i2.category = '${category2}'`;
        break;
      case 'option3':
        console.log("option3 was selected and submitted")
        query = `SELECT i.id, i.name, i.category, i.price, u.username, COUNT(*) as num_reviews
                FROM items i JOIN users u ON i.user_id = u.id
                JOIN reviews r ON i.id = r.item_id
                WHERE u.username = 'userX' AND r.rating IN ('Excellent', 'Good')
                GROUP BY i.id
                HAVING COUNT(*) = SUM(r.rating = 'Excellent' OR r.rating = 'Good')`;
        break;
      case 'option4':
        console.log("option4 was selected and submitted")
        query = `SELECT username, COUNT(*) AS num_items
                FROM users JOIN items ON users.id = items.user_id
                WHERE date_posted >= '2020-05-01'
                GROUP BY username
                ORDER BY num_items DESC
                LIMIT 1`;
        break;
      case 'option5':
        console.log("option5 was selected and submitted")
        query = `SELECT DISTINCT u.username FROM users u
                JOIN favorites f1 ON u.id = f1.user_id AND f1.favorite_id IN (
                  SELECT favorite_id FROM favorites WHERE user_id = 'userX'
                )
                JOIN favorites f2 ON u.id = f2.user_id AND f2.favorite_id IN (
                  SELECT favorite_id FROM favorites WHERE user_id = 'userY'
                )
                WHERE u.id NOT IN ('userX', 'userY')`;
        break;
      case 'option6':
        console.log("option6 was selected and submitted")
        query = `SELECT DISTINCT u.username FROM users u
                JOIN items i ON u.id = i.user_id
                JOIN reviews r ON i.id = r.item_id AND r.rating = 'Excellent'
                GROUP BY u.username
                HAVING COUNT(*) < 3`;
        break;
      case 'option7':
        console.log("option7 was selected and submitted")
        query = `SELECT DISTINCT u.username FROM users u
                JOIN reviews r ON u.id = r.user_id AND r.rating = 'Poor'
                WHERE u.id NOT IN (SELECT DISTINCT user_id FROM reviews WHERE rating != 'Poor')`;
        break;
      case 'option8':
        console.log("option8 was selected and submitted")
        query = `SELECT DISTINCT u.username FROM users u
                WHERE NOT EXISTS (
                  SELECT * FROM comments c
                  WHERE c.user_id = u.id AND c.rating != 'Poor'
                )`;
        break;
      case 'option9':
        console.log("option9 was selected and submitted")
        query = `SELECT u1.username AS user_a, u2.username AS user_b, i.name, 'Excellent' AS rating
                FROM users u1
                INNER JOIN users u2 ON u1.id < u2.id
                INNER JOIN items i ON i.user_id = u1.id AND i.user_id = u2.id
                WHERE NOT EXISTS (
                  SELECT * FROM comments c1
                  WHERE c1.user_id = u1.id AND c1.item_id = i.id AND c1.rating != 'Excellent'
                ) AND NOT EXISTS (
                  SELECT * FROM comments c2
                  WHERE c2.user_id = u2.id AND c2.item_id = i.id AND c2.rating != 'Excellent'
                )`;
        break;
      case 'option10':
        console.log("option10 was selected and submitted")
        query = `SELECT DISTINCT c1.user_id AS user_a, c2.user_id AS user_b
                FROM comments c1
                JOIN comments c2 ON c1.item_id = c2.item_id AND c1.user_id < c2.user_id
                WHERE c1.rating = 'Excellent' AND c2.rating = 'Excellent'
                GROUP BY c1.user_id, c2.user_id
                HAVING COUNT(*) = (
                  SELECT COUNT(*) FROM items i WHERE i.user_id = c1.user_id OR i.user_id = c2.user_id
                )`;
        break;
      default:
        break;
    }

    if (selectedFilter) {
      Axios.get('http://localhost:3001/homepage', { filterOption: selectedFilter })
        .then(response => {
          console.log(response.data);
          // Handle the response data here
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId='option1'>
          <Form.Check
            id='option1'
            type="radio"
            label="1- List the most expensive items in each category"
            name='filter'
            checked={selectedFilter === 'option1'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group controlId='option2'>
          <Form.Check
            id='option2'
            type="radio"
            label="2- List the users who posted at least two items on the same day with Category 1:"
            name='filter'
            checked={selectedFilter === 'option2'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
          <select id='category-select' value={category1} onChange={handleCategory1Change} required>
            <option value="-1"></option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Convertible">Convertible</option>
            <option value="Sport">Sport</option>
            <option value="Retro">Retro</option>
          </select>
          <Form.Label>and Category 2:</Form.Label>
          <select id='category-select' value={category2} onChange={handleCategory2Change} required>
            <option value="-1"></option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Convertible">Convertible</option>
            <option value="Sport">Sport</option>
            <option value="Retro">Retro</option>
          </select>
        </Form.Group>

        <Form.Group controlId='option3'>
          <Form.Check
            id='option3'
            type="radio"
            label="3-List all the items posted by user X, such that all the comments are &quot;Excellent&quot; or &quot;good&quot; for these items:"
            name='filter'
            checked={selectedFilter === 'option3'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
          <Form.Control type="text" placeholder="Enter Item Name" value={userX} onChange={handleUserXChange} required/>
        </Form.Group>

        <Form.Group controlId='option4'>
          <Form.Check
            id='option4'
            type="radio"
            label="4- List the users who posted the most number of items since 5/1/2020"
            name='filter'
            checked={selectedFilter === 'option4'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group controlId='option5'>
          <Form.Check
            id='option5'
            type="radio"
            label="5-List the other users who are favorited by both users X, and Y"
            name='filter'
            checked={selectedFilter === 'option5'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
          <Form.Control id='option5' type="text" placeholder="Enter User X" value={userX} onChange={handleUserXChange} required/>
          <Form.Control id='option5' type="text" placeholder="Enter User Y" value={userX} onChange={handleUserXChange} required/>
        </Form.Group>

        <Form.Group controlId='option6'>
          <Form.Check
            id='option6'
            type="radio"
            label="6- Display all the users who never posted any 'excellent' items: an item is excellent if at least three reviews are excellent."
            name='filter'
            checked={selectedFilter === 'option6'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group controlId='option7'>
          <Form.Check
            id='option7'
            type="radio"
            label="7- Display all the users who never posted a 'poor' review."
            name='filter'
            checked={selectedFilter === 'option7'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group controlId='option8'>
          <Form.Check
            id='option8'
            type="radio"
            label="8- Display all the users who posted some reviews, but each of them is 'poor'."
            name='filter'
            checked={selectedFilter === 'option8'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group controlId='option9'>
          <Form.Check
            id='option9'
            type="radio"
            label="9- Display those users such that each item they posted so far never received any 'poor' reviews.
            In other words, these users must have posted some items; however, these items have never
            received any poor reviews or have not received any reviews at all."
            name='filter'
            checked={selectedFilter === 'option9'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group controlId='option10'>
          <Form.Check
            id='option10'
            type="radio"
            label="10- List a user pair (A, B) such that they always gave each other 'excellent' reviews for every single
            item they posted."
            name='filter'
            checked={selectedFilter === 'option10'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
          <Form.Control id='option10-input1' type="text" placeholder="Enter User A" value={userX} onChange={handleUserXChange} required/>
          <Form.Control id='option10-input2' type="text" placeholder="Enter User B" value={userY} onChange={handleUserYChange} required/>
        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Filter</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalFilter;
