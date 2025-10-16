import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import './courses.css';

// Fallback sample data in case backend is unavailable
const sampleCourses = [
  { id: 'web-1', category: 'Web Development', title: 'Frontend Web Development', description: 'HTML, CSS, JS, React — build responsive UIs.', price: 4999 },
  { id: 'web-2', category: 'Web Development', title: 'Fullstack MERN Bootcamp', description: 'Node, Express, MongoDB + React — build real apps.', price: 9999 },
  { id: 'bc-1', category: 'Blockchain', title: 'Blockchain & Smart Contracts', description: 'Solidity, Smart Contracts, DApps and web3 integration.', price: 12999 },
  { id: 'devops-1', category: 'DevOps', title: 'DevOps Fundamentals', description: 'CI/CD, Docker, Kubernetes and cloud deployments.', price: 7999 },
  { id: 'devops-2', category: 'DevOps', title: 'Advanced SRE & Kubernetes', description: 'Production reliability, observability and scaling.', price: 14999 }
];

const categories = ['Web Development', 'Blockchain', 'DevOps'];

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await API.get("/user/courses");
        setCourses(response.data.courses || sampleCourses);
      } catch (err) {
        console.error(err);
        // fallback to sample data so UI still shows sections
        setCourses(sampleCourses);
      }
    }
    fetchCourses();
  }, []);

  function handlePurchase(course) {
    // Wire this to a purchase/enroll flow later
    alert(`Purchase clicked for ${course.title} — ₹${course.price}`);
  }

  function handleAddToCart(course) {
    // Get existing cart from localStorage or initialize empty array
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if course already in cart
    const exists = cart.find(item => (item.id || item._id) === (course.id || course._id));
    if (exists) {
      alert(`${course.title} is already in your cart!`);
      return;
    }
    
    // Add course to cart
    cart.push(course);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${course.title} added to cart!`);
  }

  return (
    <div className="courses">
      <h2>Courses</h2>

      {categories.map((cat) => {
        const list = courses.filter(c => c.category === cat);
        return (
          <section key={cat} className="course-section">
            <div className="section-header">
              <h3>{cat}</h3>
              <p className="section-sub">Popular {cat} paths, projects and mentor support.</p>
            </div>

            {list.length === 0 ? (
              <p className="no-courses">No courses in this category.</p>
            ) : (
              <div className="course-list">
                {list.map((course) => (
                  <div key={course.id || course._id} className="course-card">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <p><strong>Price:</strong> ₹{course.price}</p>
                    <div className="course-card-actions">
                      <button onClick={() => handleAddToCart(course)} className="btn-cart">Add to Cart</button>
                      <button onClick={() => handlePurchase(course)} className="btn-purchase">Purchase</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Courses;
