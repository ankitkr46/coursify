import React from "react";
import './heatmap.css';

// Dummy data: days with activity
const activityData = [
  // Array of objects: { date: 'YYYY-MM-DD', active: true/false }
  { date: '2025-10-01', active: true },
  { date: '2025-10-02', active: true },
  { date: '2025-10-03', active: false },
  { date: '2025-10-04', active: true },
  { date: '2025-10-05', active: true },
  // ...add more for demo
];

const Heatmap = () => {
  // Generate last 30 days
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (29 - i));
    const dateStr = d.toISOString().slice(0, 10);
    const active = activityData.some(a => a.date === dateStr && a.active);
    return { date: dateStr, active };
  });

  return (
    <div className="heatmap-container">
      <h3>Daily Activity Heatmap</h3>
      <div className="heatmap-grid">
        {days.map(day => (
          <div
            key={day.date}
            className={`heatmap-cell${day.active ? ' active' : ''}`}
            title={day.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
