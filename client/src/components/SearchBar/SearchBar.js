import React, {useState, useContext} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SearchBar.css'

function SearchBar(){
    const [input, setInput] = useState("");
    const [inputVal, setInputVal] = useState(false);
    const {setCategory} = useContext(UserContext);


    const search = () => {
        Axios.get("http://localhost:3001/homepage", {params: {category: input}}).then(
        (response) =>{
            setInputVal(true)
            setCategory(input)
            console.log(response);
        }
        ).catch((error) => {
            console.log("input: ", input)
            console.log(error)
        });
    }

    const handleLinkClick = (event) => {
        if (!inputVal) {
            event.preventDefault(); // stop navigation to /homepage page
            // alert('Please Enter an Existing Username and Password');
        }
    }

    return (
        <form onSubmit={(e)=> {e.preventDefault(); search(); }}>
            <Form className='d-flex'>
                <Form.Control 
                    // className='search'
                    type='search'
                    className='me-2'
                    onChange={(e)=>{ setInput(e.target.value)}} 
                    placeholder='Search a Category here...'
                    value={input}
                >
                </Form.Control>
                <Link onClick={handleLinkClick} to='/searchedItem'>            
                    <Button variant='outline-success' onClick={search} type='submit'>Search</Button>
                </Link>
            </Form>
        </form>
    )
}

export default SearchBar;