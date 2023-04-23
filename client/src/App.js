import './App.css';
import React, {useEffect, useState} from 'react';
import Register from './Register/Register'
import Login from './Login/Login'
import Homepage from './Homepage/Homepage';
import Item from './components/Item/Item';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserContext from './Contexts/UserContext';
import SearchedItem from './SearchedItem/SearchedItem';
import ItemPage from './components/Item/ItemPage';

function App() {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  return (
    <UserContext.Provider value={{username, setUsername, category, setCategory, title, setTitle}}>
      <Router>
          <Routes>
            <Route path="/" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/homepage" element={<Homepage/>}></Route>
            <Route path="/items" element={<Item/>}></Route>
            <Route path="/searchedItem" element={<SearchedItem/>}></Route>
            <Route path="/itemPage" element={<ItemPage/>}></Route>
          </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
