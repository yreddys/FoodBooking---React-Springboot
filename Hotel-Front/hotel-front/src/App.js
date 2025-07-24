// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SaveNote from "./components/SaveNote";
import MyNotes from "./components/MyNotes";
import Users from "./components/Users"; 
import MyProfile from './components/MyProfile'; 
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/save-note" element={<SaveNote />} />
        <Route path="/my-notes" element={<MyNotes />} />
          <Route path="/users" element={<Users />} /> 
          <Route path="/profile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
