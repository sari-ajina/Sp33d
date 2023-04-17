import './App.css';
import React, {useState} from 'react';
import Register from './Register/Register'
import Login from './Login/Login'
import Homepage from './Homepage/Homepage';
import Item from './components/Item/Item';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserContext from './Contexts/UserContext';
import SearchedItem from './SearchedItem/SearchedItem';

function App() {
  const [username, setUsername] = useState();
  const [category, setCategory] = useState();

  return (
    <UserContext.Provider value={{username, setUsername, category, setCategory}}>
      <Router>
          <Routes>
            <Route path="/" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/homepage" element={<Homepage/>}></Route>
            <Route path="/items" element={<Item/>}></Route>
            <Route path="/searchedItem" element={<SearchedItem/>}></Route>
          </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
