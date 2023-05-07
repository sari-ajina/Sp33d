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
        <div>
            
        </div>
    )
}

export default Filter;