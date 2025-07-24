import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Check if user has ROLE_ADMIN
  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const isAdmin = roles.includes("ROLE_ADMIN");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <h2 style={{ margin: 0 }}>📝 Note App</h2>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        {token && <Link to="/save-note" style={linkStyle}>Save Note</Link>}
        {token && isAdmin && <Link to="/users" style={linkStyle}>Users</Link>}
        {token && <Link to="/my-notes" style={linkStyle}>My Notes</Link>}
        {token && <Link to="/profile" style={linkStyle}>My Profile</Link>}

        {!token && (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </>
        )}

        {/* 
        // If you want to add logout here in future, use this:
        {token && (
          <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
        )}
        */}
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
  position: "fixed",      // 👈 Fixes the navbar to the top
  top: 0,                 // 👈 Aligns it at the top of the page
  left: 0,
  right: 0,
  zIndex: 1000,           // 👈 Ensures it stays above other elements
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
