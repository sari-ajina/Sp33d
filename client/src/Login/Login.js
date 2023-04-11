import React, { useState } from 'react';
import './Login.css';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const [loginStatus, setLoginStatus] = useState("");

    //calls an axios post method to send data to the server side
    const login = ()=>{
        Axios.post('http://localhost:3001/login', 
        {username: username, password: password}).then(
            (response) =>{
                console.log(response)
                //checks if the data contains a message that we post from the server side is an error message
                //if it is, it will post the error message, if not it will post the username 
                if(response.data.message){
                    setLoginStatus(response.data.message)
                }else{
                    setLoginStatus("logged in as " + response.data[0].result)
                }
        });
    }

    return (
    <div>
        <div className="container">
            <h2 className='login'>
                Login Here!
            </h2>
            <div>
                Enter Username: <br/>
                <input
                    placeholder='enter username'
                    type="text"
                    onChange={(e)=>{
                        setUsername(e.target.value)
                    }}
                ></input>
            </div>
            <div>
                Enter Password: <br/>
                <input
                    placeholder='enter password'
                    type="text"
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                ></input>
            </div>
            <Link to='/homepage'>
                <button className="button" onClick={login}>Login</button>
            </Link>
            <div>
                <Link to='/'>
                    <a>Not Registered? Create an Account here!</a>
                </Link>
            </div>
        </div>
            <h1 >{loginStatus}</h1>
    </div>
    );
}

export default Login;