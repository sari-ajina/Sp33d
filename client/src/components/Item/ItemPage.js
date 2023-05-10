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
import './ItemPage.css'

function ItemPage() {
    const [data, setData] = useState([]);
    const { title} = useContext(UserContext);
    const [description, setDescription] = useState();
    const [itemId1, setItemId1] = useState();
    // const [reviewer_username, setReviewerUsername] = useState();
    const [rating, setRating] = useState();
    const [reviewStatus, setReviewStatus] = useState("");
    const {itemId} = useContext(UserContext);

    const username = localStorage.getItem("username");

    useEffect(() => {
        console.log(title)
        console.log(username)
        if(itemId != null || itemId != undefined){
            Axios.get("http://localhost:3001/itemPage", {params: {item_id: itemId}})
            .then((response) => {
                console.log(response.data);
                setData(response.data.data);
                setItemId1(response.data.data[0].id);
                console.log("logging id data: ", response.data.data[0].id)
                console.log("item Id: ", itemId1)
                console.log(response)
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, []);

    const postReview = (event) => {
        event.preventDefault();

        const str = String(itemId1)

        const reviewItem = {
            item_id: str,
            reviewer_username: username,
            rating: rating,
            description: description
        }

        console.log("item str:", str)


        if(itemId1 != "" || itemId1 != undefined || itemId1 != null){
            Axios.post("http://localhost:3001/itemPage", reviewItem).then(
                (response)=>{
                    console.log(response.data);
                    if(response.data.message){
                        setReviewStatus(response.data.message);
                    }else{
                        setReviewStatus("Review for item: " + title + " posted");
                        console.log("Review status: ", reviewStatus)
                    }
                }
            )
        }else{
            console.log("item id is: ", itemId1)
        }
    }

    return (
        <div className='center-text'>
            <NavbarStyle/>
            <Row xs={1} md={1} lg={2} style={{margin: "12px"}} className="g-4">
                <Col>
                    {Array.isArray(data) ? (
                        data.map((item) => (
                            <Card border='info'>
                                <Card.Body>
                                    <Card.Title>
                                        <Card.Header>
                                            Title: {item.title}
                                        </Card.Header>
                                    </Card.Title>
                                    <Card.Text>
                                        Description: {item.description}
                                    </Card.Text>
                                    <Card.Text>
                                        Category: {item.category}
                                    </Card.Text>
                                    <Card.Text>
                                        Price: {item.price}
                                    </Card.Text>
                                    <Card.Text>
                                        User: {item.user_id}
                                    </Card.Text>
                                    <Card.Footer>
                                        <small className="text-muted">
                                            Created: {item.created_at.slice(0,10)}
                                        </small>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </Col>
                <Col>
                    <Card border='success'>
                        <Card.Body>
                            <Form onSubmit={postReview}>
                                <Card.Title>
                                    <Card.Header>
                                        Review the Item:
                                    </Card.Header>
                                </Card.Title>
                                <Card.Text>
                                    <Form.Select onChange={(e)=>{setRating(e.target.value)}} required>
                                        <option></option>
                                        <option value="excellent">excellent</option>
                                        <option value="good">good</option>
                                        <option value="fair">fair</option>
                                        <option value="poor">poor</option>
                                    </Form.Select>
                                    <br></br>
                                    <FloatingLabel 
                                        value={description} 
                                        onChange={e => setDescription(e.target.value)} required
                                        controlId="floatingTextarea2" 
                                        label="Review"
                                    >
                                        <Form.Control
                                        as="textarea"
                                        placeholder="Leave a review here"
                                        style={{ height: '100px' }}
                                        />
                                    </FloatingLabel>
                                </Card.Text>
                                <Card.Footer>
                                    <Button type="submit" variant="outline-success">Submit Review</Button>
                                </Card.Footer>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ItemPage;