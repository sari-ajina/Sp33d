import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Contexts/UserContext';
import Axios from 'axios';
import GridCards from '../components/Bootstrap/GridCards'
import NavbarStyle from '../components/Bootstrap/NavbarStyle';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

function UserProfile(){
    const user = localStorage.getItem("username");

    const [data, setData] = useState();
    const [title, setTitle] = useState();
    const [itemId, setItemId] = useState();

    useEffect(()=>{
        Axios.get(`http://localhost:3001/userprofile`, {params: {username: user}}).then(
            (response) =>{
                setData(response.data.data);
            }
        )
    }, []);

    const handleLinkClick = (event) => {
        if (title == null || title == "") {
            event.preventDefault(); // stop navigation to /homepage page
            // alert('Please Enter an Existing Username and Password');
        }
    }

    const handleTitleClick = (test) =>{
        setTitle(test);
        console.log(title);
    }

    // const retrieveItems = () => {
    //     Axios.get(`http://localhost:3001/userprofile`, {params: {username: user}}).then(
    //         (response) =>{
    //             console.log(response)
    //             setData(response.data.data);
    //         }
    //     )
    // }

    return(
        <div>
            <NavbarStyle></NavbarStyle>
            <h1 className='welcome'>username: {user}</h1>
            <Row xs={1} md={2} lg={3} style={{margin: "12px"}} className="g-4">
                    {data ? (
                        data.length > 0 ? (
                            data.map((item) => (
                                <Col key={item.id}>
                                    <Card border='info'>
                                        {/* <Card.Img variant="top" src="holder.js/100px160" alt='item image unavailable or unable to load'/> */}
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
                                </Col>
                            ))
                        ) : (
                            <h1>No items found for your user</h1>
                        )
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </Row>
        </div>
    )
}

export default UserProfile;