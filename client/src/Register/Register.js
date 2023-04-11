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
                >
                </input>
                <br/>
                <input 
                    type="text" 
                    placeholder="i.e. Doe"
                    onChange={((e)=>
                        {setLastNameReg(e.target.value)}
                    )}
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
                >
                </input>
            </div>
            <Link to='/login'>
                <button className={"button"} onClick={register}>Continue</button>
                <br/>
                <a>Already have an Account? Login!</a>
            </Link>
        </div>
    </div>
    );
}

export default Register;
