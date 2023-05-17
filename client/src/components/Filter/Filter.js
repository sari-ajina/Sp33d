import UserContext from "../../Contexts/UserContext";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

function Filter(props){
    const {data, selectedFilter} = useContext(UserContext);
    console.log(data)

    switch(selectedFilter){
        case 'option1':
            return (
                // <div>
                //   {data.map((item) => (
                //     <div key={item.id}>
                //       <h2>{item.title}</h2>
                //       <p>{item.description}</p>
                //       <p>{item.category}</p>
                //       <p>{item.price}</p>
                //       <p>{item.created_at}</p>
                //       <p>{item.user_id}</p>
                //     </div>
                //   ))}
                // </div>
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
              );
            break;
        case 'option2':
            return (
                <div>
                  {data.map((item) => (
                    <div key={item.id}>
                      <h2>Users who posted with both categories selected:</h2>
                      <h3>{item.username}</h3>
                    </div>
                  ))}
                </div>
              );
            break;
        case 'option3':
            return (
                <div>
                  {data.map((item) => (
                    <div key={item.id}>
                      <h2>{item.title}</h2>
                      <p>Description: {item.description}</p>
                      <p>Category: {item.category}</p>
                      <p>Price: {item.price}</p>
                      <p>Created: {item.created_at}</p>
                      <p>{item.user_id}</p>
                    </div>
                  ))}
                </div>
              );
            break;
        case 'option4':
            return (
                <div>
                  {data.map((item) => (
                    <div key={item.id}>
                      <h2>User who posted the most number of items since 5/1/2020:</h2>
                      <p>User: {item.username}</p>
                      <p>Number of Items: {item.num_items}</p>
                    </div>
                  ))}
                </div>
              );
            break;
        case 'option5':
            return (
                <div>
                <h2>Users who are favorited by both users selected:</h2>
                  {data.map((item) => (
                    <div key={item.id}>
                      <p>User: {item.favorite_user_id}</p>
                    </div>
                  ))}
                </div>
              );
            break;
        case 'option6':
            return (
                <div>
                <h2>All the users who never posted any 'excellent' items: an item is excellent if at least three reviews are excellent.</h2>
                  {data.map((item) => (
                    <div key={item.id}>
                      <p>User: {item.username}</p>
                    </div>
                  ))}
                </div>
              );
            break;
        case 'option7':
            return (
                <div>
                <h2>All the users who never posted a 'poor' review</h2>
                  {data.map((item) => (
                    <div key={item.id}>
                      <p>User: {item.reviewer_username}</p>
                    </div>
                  ))}
                </div>
              );
            break;
        case 'option8':
            return (
                <div>
                <h2>All the users who posted some reviews, but each of them is 'poor'</h2>
                  {data.map((item) => (
                    <div key={item.id}>
                      <p>User: {item.reviewer_username}</p>
                    </div>
                  ))}
                </div>
              );
            break;
        case 'option9':
            return (
                <div>
                <h2>Items with no 'poor' reviews:</h2>
                  {data.map((item) => (
                    <div key={item.id}>
                      <h3>Title: {item.title}</h3>
                      <p>User: {item.user_id}</p>
                    </div>
                  ))}
                </div>
              );
            break;
        case 'option10':
            return (
                <div>
                <h2>Users who gave each other excellent reviews on all items:</h2>
                  {data.map((item) => (
                    <div key={item.id}>
                      <p>User A: {item.user_A}</p>
                      <p>User B: {item.user_B}</p>
                    </div>
                  ))}
                </div>
              );
            break;
        
        default:
            break;
    }

}

export default Filter;