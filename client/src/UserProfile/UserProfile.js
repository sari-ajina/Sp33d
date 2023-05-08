import React, { useContext, useState } from 'react';
import UserContext from '../Contexts/UserContext';
import Axios from 'axios';

function UserProfile(){
    const {username} = useContext(UserContext);
    console.log(username)


    return(
        <div>
            <h1>username: {username}</h1>
        </div>
    )
}

export default UserProfile;