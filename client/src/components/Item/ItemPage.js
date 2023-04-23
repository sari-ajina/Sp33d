import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import UserContext from '../../Contexts/UserContext';

function ItemPage() {
    const [data, setData] = useState([]);
    const { title, username} = useContext(UserContext);
    const [description, setDescription] = useState();
    const [itemId, setItemId] = useState();
    // const [reviewer_username, setReviewerUsername] = useState();
    const [rating, setRating] = useState();
    // let itemId = "";
    const [reviewStatus, setReviewStatus] = useState("");

    useEffect(() => {
        console.log(title)
        console.log(username)
        Axios.get("http://localhost:3001/itemPage", {params: {title: title}})
        .then((response) => {
            console.log(response.data);
            setData(response.data.data);
            setItemId(response.data.data[0].id);
            console.log("logging id data: ", response.data.data[0].id)
            console.log("item Id: ", itemId)
            console.log(response)
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const postReview = (event) => {
        event.preventDefault();

        const str = String(itemId)

        const reviewItem = {
            item_id: str,
            reviewer_username: username,
            rating: rating,
            description: description
        }

        console.log("item str:", str)


        if(itemId != "" || itemId != undefined || itemId != null){
            Axios.post("http://localhost:3001/itemPage", reviewItem).then(
                (response)=>{
                    console.log(response.data);
                    if(response.data.message){
                        setReviewStatus(response.data.message);
                    }else{
                        setReviewStatus("Review for item: " + title + " posted");
                        console.log("Review status: ", reviewStatus)
                    }
                }
            )
        }else{
            console.log("item id is: ", itemId)
        }
    }

    return (
        <div>
            {Array.isArray(data) ? (
                data.map((item) => (
                    <div className="grid">
                        <td className="col-1" key={item.id}>
                            
                            <tr id="main">Title: {item.title}</tr>
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
            <form onSubmit={postReview}>
                <h1>Review the Item:</h1>
                <select onChange={(e)=>{setRating(e.target.value)}} required>
                    <option></option>
                    <option value="excellent">excellent</option>
                    <option value="good">good</option>
                    <option value="fair">fair</option>
                    <option value="poor">poor</option>
                </select>
                <br></br>
                <textarea placeholder='write a review here...' value={description} onChange={e => setDescription(e.target.value)} required />
                <br></br>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default ItemPage;