import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const isAdmin = roles.includes("ROLE_ADMIN");

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">📝 Note App</h2>

      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        {token && (
          <>
            <Link to="/save-note" onClick={() => setMenuOpen(false)}>Save Note</Link>
            <Link to="/my-notes" onClick={() => setMenuOpen(false)}>My Notes</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>My Profile</Link>
          </>
        )}

        {token && isAdmin && (
          <>
            <Link to="/users" onClick={() => setMenuOpen(false)}>Users</Link>
            <Link to="/upload-users" onClick={() => setMenuOpen(false)}>Upload Users</Link>
            <Link to="/admin/publish-update" onClick={() => setMenuOpen(false)}>Publish Update</Link>
            <Link to="/admin/send-interest-emails" onClick={() => setMenuOpen(false)}>Send Interest Emails</Link>
          </>
        )}

        {!token && (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
          </>
        )}
        {/* ✅ Removed Logout button from here */}
      </div>
    </nav>
  );
};

export default Navbar;
