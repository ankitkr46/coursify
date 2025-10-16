import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const r = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(r || null);
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    // reload or navigate to home
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Coursify</Link>
      </div>
      <div className="navbar-links">
        <Link to="/courses">Courses</Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/forum">Forum</Link>
            {role === 'admin' && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            {/* Admin link only for admin role when not logged in */}
            {role === 'admin' && <Link to="/admin">Admin</Link>}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
