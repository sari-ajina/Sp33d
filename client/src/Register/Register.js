import React, {useState} from "react";
import './Register.css';
import Axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [firstNameReg, setFirstNameReg] = useState("");
    const [lastNameReg, setLastNameReg] = useState("");
    const [registered, setRegistered] = useState(false);
    const navigate = useNavigate();

    //calls a axios post method that pushes data to the server side
    const register = ()=>{
        //if the password confirmation is not the same as the password, it will alert the user
        if(passwordConf != passwordReg){
            window.alert("passwords do not match");
        } else {
            Axios.post('http://localhost:3001/register', 
            {firstName: firstNameReg, lastName: lastNameReg, 
                username: usernameReg, email: emailReg, password: passwordReg
            }).then((response) =>{
                console.log(response)
            });
        }
    }

    const handleLinkClick = (event) => {
        if(usernameReg != null && passwordReg != null && 
            passwordConf == passwordReg && emailReg != null && 
            firstNameReg != null && lastNameReg != null){
                setRegistered(true)
        }
        if (!registered) {
            event.preventDefault(); // stop navigation to /login page
            alert('Please fill out all fields of registration first.');
        }
    }

    return (
    <div>
        <div className="container">
            <h2>
                Register Here!
            </h2>
            <div>
                Enter First and Last Name: <br/>
                <input 
                    type="text" 
                    placeholder="i.e. John"
                    onChange={((e)=>
                        {setFirstNameReg(e.target.value)}
                    )}
                    required
                >
                </input>
                <br/>
                <input 
                    type="text" 
                    placeholder="i.e. Doe"
                    onChange={((e)=>
                        {setLastNameReg(e.target.value)}
                    )}
                    required
                >
                </input>
            </div>
            <div>
                Enter Username: <br/>
                <input 
                    type="text" 
                    placeholder="i.e. johndoe"
                    onChange={((e)=>
                        {setUsernameReg(e.target.value)}
                    )}
                    required
                >
                </input>
            </div>
            <div>
                Enter Email: <br/>
                <input 
                    placeholder="i.e. johndoe@email.com"
                    type="text" 
                    onChange={((e)=>
                        {setEmailReg(e.target.value)}
                    )}
                    required
                >
                </input>
            </div>
            <div>
                Enter Password: <br/>
                <input 
                    placeholder="password"
                    type="text" 
                    onChange={((e)=>
                        {setPasswordReg(e.target.value)}
                    )}
                    required
                >
                </input>
            </div>
            <div>
                Confirm Password: <br/>
                <input 
                    placeholder="input the same password"
                    type="text" 
                    onChange={((e)=>
                        {setPasswordConf(e.target.value)}
                    )}
                    required
                >
                </input>
            </div>
            <Link to='/login' onClick={handleLinkClick}>
                <button className={"button"} onClick={register}>Continue</button>
                <br/>
                <a>Already have an Account? Login!</a>
            </Link>
        </div>
    </div>
    );
}

export default Register;