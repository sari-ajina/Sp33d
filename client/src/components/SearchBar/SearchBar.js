import React, {useState, useContext} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext';

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
            <input 
                onChange={(e)=>{ setInput(e.target.value)}} 
                placeholder='Search a Category here...'
                value={input}
            >
            </input>
            <Link onClick={handleLinkClick} to='/searchedItem'>            
                <button onClick={search} type='submit'>Search</button>
            </Link>
        </form>
    )
}

export default SearchBar;