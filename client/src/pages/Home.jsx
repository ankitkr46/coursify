import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-modern">
      {/* Hero Section */}
      <section className="hero">
        <h1>
          Upgrade Your Skills with <span className="brand">Coursify</span>
        </h1>
        <p>
          Join live classes, track your progress, and connect with a vibrant
          learning community.
        </p>
        <div className="hero-actions">
          <Link to="/courses" className="btn-primary">
            Explore Courses
          </Link>
          <Link to="/register" className="btn-secondary">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-grid">
        <div className="feature-card">
          <h3>Live Classes</h3>
          <p>
            Interactive sessions with top mentors and instant doubt resolution.
          </p>
        </div>
        <div className="feature-card">
          <h3>Community Forum</h3>
          <p>Participate in discussions and collaborate with fellow learners.</p>
        </div>
        <div className="feature-card">
          <h3>Progress Tracking</h3>
          <p>Earn badges and certificates as you complete courses.</p>
        </div>
        <div className="feature-card">
          <h3>Personal Dashboard</h3>
          <p>Access all your enrolled courses, wishlist, and notifications.</p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses-section">
        <h2>Available Courses</h2>
        {/* <Courses /> */}
        <div
          style={{
            textAlign: "center",
            color: "#888",
          }}
        >
          Browse our catalog to find your next learning adventure!
        </div>
      </section>
    </div>
  );
};

export default Home;
