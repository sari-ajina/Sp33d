import React, { useEffect, useState, useContext } from "react";
import Axios from 'axios';
import UserContext from "../../Contexts/UserContext";
import './ItemParts.css'
import { Link } from "react-router-dom";

function ItemParts() {
    const [data, setData] = useState([]);
    const { setTitle, title} = useContext(UserContext);

    useEffect(() => {
        if (true) {
            Axios.get("http://localhost:3001/searchedItem", {params: {category: 'cars'}})
            .then((response) => {
                // console.log("setTitle ",title)
                console.log(response.data);
                setData(response.data.data);
                console.log(response)
            })
            .catch((error) => {
                console.error(error);
            });
        }
        console.log(setTitle)
    }, []);

    const handleTitleClick = (test) =>{
        setTitle(test);
        console.log(title);
    }

    const handleLinkClick = (event) => {
        if (title == null || title == "") {
            event.preventDefault(); // stop navigation to /homepage page
            // alert('Please Enter an Existing Username and Password');
        }
    }

    return (
        <div>
            {Array.isArray(data) ? (
                data.map((item) => (
                    <div className="grid">
                        <td className="col-1" key={item.id}>
                            <tr id="main">
                                <Link onClick={handleLinkClick} to="/itemPage"><a onClick={() => handleTitleClick(item.title)}  >Title: {item.title}</a></Link>
                            </tr>
                            <tr id="main">Description: {item.description}</tr>
                            <tr id="main">Category: {item.category}</tr>
                            <tr id="main">Price: {item.price}</tr>
                            <tr id="sub">Created: {item.created_at.slice(0,10)}</tr>
                            <tr id="sub">User: {item.user_id}</tr>
                        </td>
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default ItemParts;
