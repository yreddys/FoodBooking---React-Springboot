// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <h2 style={{ margin: 0 }}>📝 Note App</h2>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
         {token && <Link to="/save-note" style={linkStyle}>Save Note</Link>}
        {token && <Link to="/users" style={linkStyle}>Users</Link>}
         {token && <Link to="/my-notes" style={linkStyle}>My Notes</Link>}
        {!token ? (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
        )}
      </div>
    </nav>
  );
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#333",
  color: "white",
  padding: "10px 20px",
};

const linkStyle = {
  color: "white",
  margin: "0 10px",
  textDecoration: "none",
};

const logoutButtonStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  margin: "0 10px",
  cursor: "pointer",
};

export default Navbar;
