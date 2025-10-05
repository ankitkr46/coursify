import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Coursify</Link>
    </div>
    <div className="navbar-links">
      <Link to="/courses">Courses</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/forum">Forum</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </nav>
);

export default Navbar;
