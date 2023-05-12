import React, { useContext, useState } from 'react';
import './Login.css';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../Contexts/UserContext';

function Login() {
    const [usernameInput, setUsernameInput] = useState("");
    const [password, setPassword] = useState("");
    const {setUsername} = useContext(UserContext);

    const navigate = useNavigate();
    
    const [loginStatus, setLoginStatus] = useState("");

    const [logged, setLogged] = useState(false);

    //calls an axios post method to send data to the server side
    const login = ()=>{
        Axios.post('http://localhost:3001/login', 
        {username: usernameInput, password: password}).then(
            (response) =>{
                console.log(response)
                //checks if the data contains a message that we post from the server side is an error message
                //if it is, it will post the error message, if not it will post the username 
                if(response.data.message){
                    setLoginStatus(response.data.message)

                }else{
                    setLogged(true)
                    // console.log("logged in as " + response.data.result)
                    // setLoginStatus("logged in as " + response.data.result)
                    //set the usernamem val in the UserContext
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("username", response.data.result)
                    const user = localStorage.getItem("username")
                    setUsername(user);
                }
        });
    }

    const handleLinkClick = (event) => {
        if (!logged) {
            event.preventDefault(); // stop navigation to /homepage page
            // alert('Please Enter an Existing Username and Password');
        }
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
                    className="input-reg"
                    placeholder='enter username'
                    type="text"
                    onChange={(e)=>{
                        setUsernameInput(e.target.value)
                    }}
                ></input>
            </div>
            <div>
                Enter Password: <br/>
                <input
                    className="input-reg"
                    placeholder='enter password'
                    type="text"
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                ></input>
            </div>
            <Link to='/homepage' onClick={handleLinkClick}>
                <button className="log-button" onClick={login}>Login</button>
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