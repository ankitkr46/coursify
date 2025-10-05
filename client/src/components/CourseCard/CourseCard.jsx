import React from "react";
import './coursecard.css';

const CourseCard = ({ course }) => (
  <div className="course-card">
    <img src={course.imageLink} alt={course.title} className="course-image" />
    <h3>{course.title}</h3>
    <p>{course.description}</p>
    <p><strong>Price:</strong> ₹{course.price}</p>
    <button>Enroll</button>
  </div>
);

export default CourseCard;
