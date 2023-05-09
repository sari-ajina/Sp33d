import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState, useContext } from "react";
import Axios from 'axios';
import UserContext from "../../Contexts/UserContext";
// import './ItemParts.css'
import { Link } from "react-router-dom";

function GridCards() {

    const [data, setData] = useState([]);
    const { setTitle, title, category, setItemId, profileUser, setProfileUser} = useContext(UserContext);

    useEffect(() => {
        if (true) {
            Axios.get("http://localhost:3001/searchedItem", {params: {category: category}})
            .then((response) => {
                // console.log("setTitle ",title)
                console.log(response.data);
                setData(response.data.data);
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
        }
        console.log(setTitle)
    }, []);

    const handleTitleClick = (test) =>{
        setTitle(test);
        console.log(title);
    }

    const handleUserClick = (test) =>{
        setProfileUser(test);
        console.log(profileUser);
    }

    const handleLinkClick = (event) => {
        if (title == null || title == "") {
            event.preventDefault(); // stop navigation to /homepage page
            // alert('Please Enter an Existing Username and Password');
        }
    }

    const linkUser = (event) => {
        if (profileUser == null || profileUser == "") {
            event.preventDefault(); // stop navigation to /homepage page
            // alert('Please Enter an Existing Username and Password');
        }
    }

    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {data ? (
                data.length > 0 ? (
                    data.map((item) => (
                        <Col key={item.id}>
                            <Card border='info'>
                                {/* <Card.Img variant="top" src="holder.js/100px160" alt='item image unavailable or unable to load'/> */}
                                <Card.Body>
                                    <Card.Title>
                                        <Card.Header>
                                            <Link onClick={handleLinkClick} to="/itemPage">
                                                <a onClick={() => {
                                                    handleTitleClick(item.title);
                                                    setItemId(item.id);
                                                }}
                                                >
                                                    Title: {item.title}
                                                </a>
                                            </Link>
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
                                        <Link onClick={linkUser} to="/profile">
                                            <a onClick={() => {
                                                handleUserClick(item.user_id);
                                            }}
                                            >
                                                User: {item.user_id}
                                            </a>
                                        </Link>
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
                    <h1>No items found with category of {category}</h1>
                )
            ) : (
                <h1>Loading...</h1>
            )}
        </Row>
    );
}

export default GridCards;