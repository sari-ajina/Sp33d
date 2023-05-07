import React, { useContext, useState } from 'react';
import UserContext from '../Contexts/UserContext';
import Axios from 'axios';

function Profile(){
    const {profileUser, username} = useContext(UserContext);
    const [favStatus, setFavStatus] = useState('');

    const param = {
        username: username,
        profileUser: profileUser
    }

    const handleFavoriteClick = () => {
        if(profileUser){
            Axios.post('http://localhost:3001/profile', param)
            .then((response) => {
                if(response.data.message){
                    setFavStatus(response.data.message);
                }else{
                    setFavStatus("you started following", profileUser);
                }
    
            })
        }
    }

    return(
        <div>
            <h1>username: {profileUser}</h1>
            <button onClick={handleFavoriteClick}>Favorite</button>
            <h3>{favStatus}</h3>
        </div>
    )
}

export default Profile;