import React, { useEffect, useState, useContext } from "react";
import Axios from 'axios';
import UserContext from "../../Contexts/UserContext";
import './ItemParts.css'

function ItemParts() {
    const [data, setData] = useState([]);
    const { category } = useContext(UserContext);

    useEffect(() => {
        if (category) {
            Axios.get("http://localhost:3001/searchedItem", {params: {category: category}})
            .then((response) => {
                console.log(response.data);
                setData(response.data.data);
                console.log(response)
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, []);

    return (
        <div>
            {Array.isArray(data) ? (
                data.map((item) => (
                    <div className="grid">
                        <td className="col-1" key={item.id}>
                            <tr id="main"><a href="#">Title: {item.title}</a></tr>
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
