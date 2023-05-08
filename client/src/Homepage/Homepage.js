import React, { useState, useContext } from 'react';
import './Homepage.css';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import ModalFilter from '../components/Bootstrap/ModalFilter';
import Button from 'react-bootstrap/Button';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Filter from '../components/Filter/Filter';
import NavbarStyle from '../components/Bootstrap/NavbarStyle';

function Homepage() {
    const [tableName, setTableName] = useState("");
    const [modalShow, setModalShow] = useState(false);

    // const navigate = useNavigate();
    
    const [status, setStatus] = useState("");

    //calls an axios post method to send data to the server side
    // const initialize = () =>{
    //     Axios.post('http://localhost:3001/homepage', 
    //     {tableName: tableName}).then(
    //         (response) =>{
    //             console.log(response)

    //         if(response.data.message){
    //             setStatus(response.data.message)
    //         }else{
    //             setStatus("created status with name " + {tableName})
    //         }
    //     });
    // }

    return (
    <div className='contained'>
        <NavbarStyle></NavbarStyle>
        <h3>Welcome to your home page!</h3>
        {/* <input 
            type="text" 
            placeholder='insert a name' 
            onChange={(e)=>{
                setTableName(e.target.value)
            }}>
        </input> */}
        {/* <button className='button' onClick={initialize}>Initialize Database</button> */}
        
        {/* <SearchBar/> */}

        <Button onClick={() => setModalShow(true)}>
            Filter 
        </Button>

        <ModalFilter
            show={modalShow}
            onHide={() => setModalShow(false)}
        />

        <Link to='/items'>
            <button>Add an Item</button>
        </Link>

        <Filter></Filter>
        {/* <h1>{status}</h1> */}
    </div>
    );
}

export default Homepage;