import './App.css';
import Register from './Register/Register'
import Login from './Login/Login'
import Homepage from './Homepage/Homepage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/homepage" element={<Homepage/>}></Route>
        </Routes>
    </Router>
    // <div>
    //   <Register/>
    //   <Login/>
    // </div>
  );
}

export default App;
