import React, {useContext, useState} from "react";
import ItemParts from "../components/Item/ItemParts";
import UserContext from "../Contexts/UserContext";
import './SearchedItem.css'

function SearchedItem(){
    const {category} = useContext(UserContext);
    
    
    return(
        <div className="grid">
            <h1 className="col-1">Searched for: {category}</h1>
            <ItemParts className="col-1"/>
        </div>
    )
}

export default SearchedItem;