import React, { useEffect, useState } from "react";
import API from "../utils/api";
import './profile.css';
import Heatmap from "../components/Profile/Heatmap";
import StreakTable from "../components/Profile/StreakTable";

const Profile = () => {
  const [user, setUser] = useState({ name: "User", email: "", avatar: "" });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulate fetching user info and purchased courses
    async function fetchProfile() {
      // Replace with real API call for user info if available
      setUser({ name: "John Doe", email: "john@example.com", avatar: "https://randomuser.me/api/portraits/men/32.jpg" });
      try {
        const response = await API.get("/user/purchasedCourses");
        setCourses(response.data.purchasedCourses || []);
      } catch (err) {
        setCourses([]);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="avatar" className="profile-avatar" />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="profile-section">
        <h3>My Courses</h3>
        <ul className="profile-courses">
          {courses.length === 0 ? (
            <li>No courses purchased yet.</li>
          ) : (
            courses.map(course => (
              <li key={course._id || course.id}>
                <strong>{course.title}</strong> - ₹{course.price}
              </li>
            ))
          )}
        </ul>
      </div>
      <Heatmap />
      <StreakTable />
    </div>
  );
};

export default Profile;
