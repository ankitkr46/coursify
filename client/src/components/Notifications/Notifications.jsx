import React from "react";
import './notifications.css';

const Notifications = ({ notifications }) => (
  <div className="notifications">
    <h4>Notifications</h4>
    <ul>
      {notifications.map((note, idx) => (
        <li key={idx}>{note}</li>
      ))}
    </ul>
  </div>
);

export default Notifications;
