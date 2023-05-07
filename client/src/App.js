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
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Profile from './Profile/Profile';

function App() {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [profileUser, setProfileUser] = useState('');

  return (
      <UserContext.Provider 
        value={{
          username, setUsername, 
          category, setCategory, 
          title, setTitle, 
          data, setData, 
          itemId, setItemId,
          profileUser, setProfileUser
          }}
        >
      <Router>
          <Routes>
            <Route path="/" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/homepage" element={<Homepage/>}></Route>
            <Route path="/items" element={<Item/>}></Route>
            <Route path="/searchedItem" element={<SearchedItem/>}></Route>
            <Route path="/itemPage" element={<ItemPage/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
