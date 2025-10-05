import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import './courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await API.get("/user/courses");
        setCourses(response.data.courses);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="courses">
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id || course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <button>Purchase</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
