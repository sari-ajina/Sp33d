import React, { useState } from 'react';
import './Homepage.css';
import Axios from 'axios';

function Homepage() {
    const [tableName, setTableName] = useState("");
    const navigate = useNavigate();
    
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
    <div className='container'>
        <h3>Welcome to your home page!</h3>
        {/* <input 
            type="text" 
            placeholder='insert a name' 
            onChange={(e)=>{
                setTableName(e.target.value)
            }}>
        </input> */}
        {/* <button className='button' onClick={initialize}>Initialize Database</button> */}
        <form onSubmit={handleSearch}>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit">Search</button>
      </form>
        <Link to='/items'>
            <button>Add an Item</button>
        </Link>
        <h1>{status}</h1>
    </div>
    );
}

export default Homepage;