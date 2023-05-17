import React, { useState, useContext, useEffect } from 'react';
import './Homepage.css';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import ModalFilter from '../components/Bootstrap/ModalFilter';
import Button from 'react-bootstrap/Button';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Filter from '../components/Filter/Filter';
import NavbarStyle from '../components/Bootstrap/NavbarStyle';
import UserContext from '../Contexts/UserContext';
import RandomItem from '../components/RandomItem/RandomItem';

function Homepage() {
    const [tableName, setTableName] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const user = localStorage.getItem("username");


    useEffect(() =>{
        console.log(user)
    })

    
    const [status, setStatus] = useState("");


    return (
    <div className='contained'>
        <NavbarStyle></NavbarStyle>
        <h3 className='welcome'>Welcome to your home page {user}</h3>

        <Filter></Filter>
        <RandomItem/>
        {/* <h1>{status}</h1> */}
    </div>
    );
}

export default Homepage;