import React, {useContext, useState} from "react";
import ItemParts from "../components/Item/ItemParts";
import UserContext from "../Contexts/UserContext";
import './SearchedItem.css'
import GridCards from "../components/Bootstrap/GridCards";

function SearchedItem(){
    const {category} = useContext(UserContext);
    
    
    return(
        <div className="grid">
            <h1 className="col-1">Searched for: {category}</h1>
            {/* <ItemParts className="col-1"/> */}
            <GridCards></GridCards>
        </div>
    )
}

export default SearchedItem;