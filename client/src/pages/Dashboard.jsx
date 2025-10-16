import React, { useEffect, useState } from "react";
import API from "../utils/api";
import './dashboard.css';

const Dashboard = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [user, setUser] = useState({ name: "User" });

  useEffect(() => {
    async function fetchPurchasedCourses() {
      try {
  const response = await API.get("/users/purchasedCourses");
        setPurchasedCourses(response.data.purchasedCourses || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPurchasedCourses();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name}</h2>
      <section className="dashboard-section">
        <h3>Purchased Courses</h3>
        <ul>
          {purchasedCourses.length === 0 ? (
            <li>No courses purchased yet.</li>
          ) : (
            purchasedCourses.map(course => (
              <li key={course._id || course.id}>
                <strong>{course.title}</strong> - ₹{course.price}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
