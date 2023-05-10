import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Contexts/UserContext';
import Axios from 'axios';
import NavbarStyle from '../components/Bootstrap/NavbarStyle';
import GridCards from '../components/Bootstrap/GridCards';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

function Profile(){
    const {profileUser} = useContext(UserContext);
    const [favStatus, setFavStatus] = useState('');
    const [data, setData] = useState();
    const [itemId, setItemId] = useState();
    const [title, setTitle] = useState();


    const username = localStorage.getItem("username");

    useEffect(()=>{
        Axios.get("http://localhost:3001/profile", {params: {profile: profileUser}})
        .then((response) => {
            // console.log("setTitle ",title)
            console.log(response.data);
            setData(response.data.data);
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const param = {
        username: username,
        profileUser: profileUser
    }

    console.log("username", username)

    const handleFavoriteClick = () => {
        if(profileUser){
            Axios.post('http://localhost:3001/profile', param)
            .then((response) => {
                if(response.data.message){
                    setFavStatus(response.data.message);
                }else{
                    setFavStatus("you started following", profileUser);
                }
    
            })
        }
    }

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

    return(
        <div>
            <NavbarStyle/>
            <h1>username: {profileUser}</h1>
            <button onClick={handleFavoriteClick}>Favorite</button>
            <h3>{favStatus}</h3>
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

export default Profile;