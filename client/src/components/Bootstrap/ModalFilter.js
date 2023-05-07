import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react';
import Axios from 'axios';
import UserContext from '../../Contexts/UserContext';

function ModalFilter(props) {

  const [selectedFilter, setSelectedFilter] = useState('');
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [option3, setOption3] = useState('');
  const [userX, setUserX] = useState('');
  const [userY, setUserY] = useState('');

  const {setData} = useContext(UserContext);

  const handleCategory1Change = (event) => {
    setCategory1(event.target.value);
  };

  const handleCategory2Change = (event) => {
    setCategory2(event.target.value);
  };

  const handleOption3Change = (event) => {
    setOption3(event.target.value);
  };

  const handleUserXChange = (event) => {
    setUserX(event.target.value);
  };

  const handleUserYChange = (event) => {
    setUserY(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (selectedFilter) {
      Axios.get('http://localhost:3001/filter',{params: { filteredOption: selectedFilter, category1: category1, category2: category2, userX: userX, option3: option3 }} )
        .then(response => {
          switch (selectedFilter) {
            case 'option1':
              let dataToSet1 = {
                Title: response.data.data[0].title
              }
              setData(dataToSet1)
              break;
            case 'option2':
              let dataToSet2 = {
                Title: ''
              }
              setData(dataToSet2)
              break;
            case 'option3':
              let dataToSet3 = {
                Title: ''
              }
              setData(response.data.data)
              // setData(dataToSet3)
              break;
            case 'option4':
              let dataToSet4 = {
                Title: ''
              }
              setData(dataToSet4)
              break;
            case 'option5':
              let dataToSet5 = {
                Title: ''
              }
              setData(dataToSet5)
              break;
            case 'option6':
              let dataToSet6 = {
                Title: ''
              }
              setData(dataToSet6)
              break;
            case 'option7':
              let dataToSet7 = {
                Title: ''
              }
              setData(dataToSet7)
              break;
            case 'option8':
              let dataToSet8 = {
                Title: ''
              }
              setData(dataToSet8)
              break;
            case 'option9':
              let dataToSet9 = {
                Title: ''
              }
              setData(dataToSet9)
              break;
            case 'option10':
              let dataToSet10 = {
                Title: ''
              }
              setData(dataToSet10)
              break;
          
            default:
              break;
          }
          // console.log(response.data);
          // setData(response.data.data);
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
        <Form.Group>
          <Form.Check
            id='option1'
            type="radio"
            label="1- List the most expensive items in each category"
            name='filter'
            checked={selectedFilter === 'option1'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group>
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

        <Form.Group>
          <Form.Check
            id='option3'
            type="radio"
            label="3-List all the items posted by user X, such that all the comments are &quot;Excellent&quot; or &quot;good&quot;:"
            name='filter'
            checked={selectedFilter === 'option3'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
          <Form.Control id='option3' type="text" placeholder="Enter User X" value={option3} onChange={handleOption3Change} required/>
        </Form.Group>

        <Form.Group>
          <Form.Check
            id='option4'
            type="radio"
            label="4- List the users who posted the most number of items since 5/1/2020"
            name='filter'
            checked={selectedFilter === 'option4'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Check
            id='option5'
            type="radio"
            label="5-List the other users who are favorited by both users X, and Y"
            name='filter'
            checked={selectedFilter === 'option5'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
          <Form.Control id='option5' type="text" placeholder="Enter User X" value={userX} onChange={handleUserXChange} required/> 
          <Form.Control id='option5' type="text" placeholder="Enter User Y" value={userY} onChange={handleUserYChange} required/>
        </Form.Group>

        <Form.Group>
          <Form.Check
            id='option6'
            type="radio"
            label="6- Display all the users who never posted any 'excellent' items: an item is excellent if at least three reviews are excellent."
            name='filter'
            checked={selectedFilter === 'option6'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Check
            id='option7'
            type="radio"
            label="7- Display all the users who never posted a 'poor' review."
            name='filter'
            checked={selectedFilter === 'option7'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Check
            id='option8'
            type="radio"
            label="8- Display all the users who posted some reviews, but each of them is 'poor'."
            name='filter'
            checked={selectedFilter === 'option8'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
        </Form.Group>

        <Form.Group>
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

        <Form.Group>
          <Form.Check
            id='option10'
            type="radio"
            label="10- List a user pair (A, B) such that they always gave each other 'excellent' reviews for every single
            item they posted."
            name='filter'
            checked={selectedFilter === 'option10'}
            onChange={(e) => setSelectedFilter(e.target.id)}
          />
          {/* <Form.Control id='option10-input1' type="text" placeholder="Enter User A" value={userX} onChange={handleUserXChange} required/>
          <Form.Control id='option10-input2' type="text" placeholder="Enter User B" value={userY} onChange={handleUserYChange} required/> */}
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
