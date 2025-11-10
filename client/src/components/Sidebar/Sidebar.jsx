import React from "react";
import './sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <ul>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/profile">Profile</a></li>
      <li><a href="/wishlist">Wishlist</a></li>
      <li><a href="/forum">Forum</a></li>
      <li><a href="/admin">Admin Panel</a></li>
    </ul>
  </aside>
);

export default Sidebar;




