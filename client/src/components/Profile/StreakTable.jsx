import React from "react";
import './streaktable.css';

// Generate 1 month (30 days) of streak data
const daysInMonth = 30;
const streaks = Array.from({ length: daysInMonth }, (_, i) => ({
  studied: Math.random() > 0.4 // Randomly mark as studied or not
}));

const StreakTable = () => (
  <div className="streak-table-container">
    <h3>Monthly Streak</h3>
    <div className="streak-month-card">
      {streaks.map((s, i) => (
        <div key={i} className="streak-day">
          {s.studied ? '🔥' : '😭'}
        </div>
      ))}
    </div>
  </div>
);

export default StreakTable;
