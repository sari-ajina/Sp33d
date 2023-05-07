import UserContext from "../../Contexts/UserContext";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

function Filter(props){
    const {data} = useContext(UserContext);

    console.log(data)
    
    return(
        <>
        <Row xs={1} md={2} className="g-4">
            {data.forEach(obj => {
                Object.keys(obj).forEach(key => {
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Key: {key}
                            </Card.Title>
                            <Card.Text>
                                Value: {obj[key]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                });
            })}
        </Row>
        </>
    )
}

export default Filter;