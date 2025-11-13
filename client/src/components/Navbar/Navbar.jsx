import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const r = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(r || null);

    // Load theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    // load cart count
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
    // listen for auth changes in same tab (login/register/logout)
    const onAuthChanged = () => {
      const t = localStorage.getItem('token');
      const rr = localStorage.getItem('role');
      setIsLoggedIn(!!t);
      setRole(rr || null);
    };
    window.addEventListener('auth-changed', onAuthChanged);
    return () => window.removeEventListener('auth-changed', onAuthChanged);
  }, []);

  useEffect(() => {
    // listen to storage changes (other tabs) and update cart count
    const onStorage = (e) => {
      if (e.key === 'cart') {
        const cart = JSON.parse(e.newValue || '[]');
        setCartCount(cart.length);
      }
    };
    window.addEventListener('storage', onStorage);
    // also listen to local custom event for same-tab updates
    const onCartUpdated = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };
    window.addEventListener('cart-updated', onCartUpdated);
    return () => window.removeEventListener('storage', onStorage);
    // cleanup for cart-updated
    // Note: remove both listeners
    // (we remove onStorage above; remove cart-updated here)
    // return cleanup handled below in a single function
  }, []);

  // second effect to clean up properly
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'cart') {
        const cart = JSON.parse(e.newValue || '[]');
        setCartCount(cart.length);
      }
    };
    const onCartUpdated = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('cart-updated', onCartUpdated);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cart-updated', onCartUpdated);
    };
  }, []);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    // notify same-tab listeners
    window.dispatchEvent(new Event('auth-changed'));
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
            <Link to="/purchase">Cart{cartCount > 0 ? ` (${cartCount})` : ''}</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
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
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
