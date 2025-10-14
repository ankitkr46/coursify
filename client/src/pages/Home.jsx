import React, { useEffect, useRef, useState } from "react";
import "./home.css"; // keep fallback styles for non-tailwind parts
import { Link } from "react-router-dom";
import API from "../utils/api";

const Home = () => {
  const sliderRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const sampleCourses = [
    { id: 'web-1', category: 'Web Development', title: 'Frontend Web Development', description: 'HTML, CSS, JS, React — build responsive UIs.', price: 4999 },
    { id: 'bc-1', category: 'Blockchain', title: 'Blockchain & Smart Contracts', description: 'Solidity, Smart Contracts, DApps and web3 integration.', price: 12999 },
    { id: 'devops-1', category: 'DevOps', title: 'DevOps Fundamentals', description: 'CI/CD, Docker, Kubernetes and cloud deployments.', price: 7999 }
  ];

  useEffect(() => {
    let mounted = true;
    async function fetchFeatured() {
      try {
        const res = await API.get('/user/courses');
        if (!mounted) return;
  const remote = res.data && res.data.courses;
  const chosen = (remote && remote.length > 0) ? remote : sampleCourses;
  console.info('Home: fetched courses, using', chosen.length, 'items');
  setCourses(chosen);
      } catch (err) {
        console.error('Failed to fetch courses, using sample data', err);
        if (!mounted) return;
        setCourses(sampleCourses);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchFeatured();
    return () => { mounted = false };
  }, []);

  useEffect(() => {
  // run the carousel logic only after courses have loaded and there is at least one slide
    if (loading) return;
  const slider = sliderRef.current || document.querySelector('.courses-slider');
    if (!slider) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // do not auto-scroll

  // Duplicate children so we can loop seamlessly
  const slides = Array.from(slider.children);
  if (slides.length === 0) return;

    // If already duplicated (e.g., hot reload), avoid duplicating again
    const alreadyDuplicated = slider.dataset.duplicated === 'true';
    if (!alreadyDuplicated) {
      slides.forEach((s) => {
        const clone = s.cloneNode(true);
        slider.appendChild(clone);
      });
      slider.dataset.duplicated = 'true';
    }

  let rafId = null;
  let lastTime = null;
    const speed = 40; // pixels per second
    let paused = false;

    const step = (time) => {
      if (paused) {
        lastTime = time;
        rafId = requestAnimationFrame(step);
        return;
      }
      const dt = (time - lastTime) / 1000; // seconds
      lastTime = time;
      // advance scrollLeft by speed * dt
      slider.scrollLeft += speed * dt;

      // if we've scrolled past the original slides width, reset
      const firstHalfWidth = slider.scrollWidth / 2;
      if (slider.scrollLeft >= firstHalfWidth) {
        slider.scrollLeft -= firstHalfWidth;
      }

      rafId = requestAnimationFrame(step);
    };

    // Pause on hover / focus for accessibility
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };

    slider.addEventListener('mouseenter', onEnter);
    slider.addEventListener('mouseleave', onLeave);
    slider.addEventListener('focusin', onEnter);
    slider.addEventListener('focusout', onLeave);

    // ensure layout done before starting
    requestAnimationFrame((t) => {
      lastTime = t;
      console.info('Home: starting carousel animation');
      rafId = requestAnimationFrame(step);
    });

    return () => {
      cancelAnimationFrame(rafId);
      slider.removeEventListener('mouseenter', onEnter);
      slider.removeEventListener('mouseleave', onLeave);
      slider.removeEventListener('focusin', onEnter);
      slider.removeEventListener('focusout', onLeave);
    };
  }, []);

  return (
  <div className="home-modern">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <h1>
            Upgrade Your Skills with <span className="brand">Coursify</span>
          </h1>
          <p>
            Join live classes, track your progress, and connect with a vibrant learning community.
          </p>
          <div className="hero-actions">
            <Link to="/courses" className="btn-primary">Explore Courses</Link>
            <Link to="/register" className="btn-secondary">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-grid">
        <div className="feature-card">
          <h3>Live Classes</h3>
          <p>Interactive sessions with top mentors and instant doubt resolution.</p>
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
        <div
          className="courses-slider"
          role="list"
          aria-label="Available courses carousel"
          tabIndex={0}
          ref={sliderRef}
        >
          {loading ? (
            // show 3 skeletons while loading — use existing CSS classes
            [1,2,3].map((i) => (
              <div className="course-card-slide" role="listitem" key={`skeleton-${i}`}>
                <div className="course-card-inner">
                  <div style={{height: 96, background: '#eee', borderRadius: 8, marginBottom: 12}} />
                  <div style={{height: 12, background: '#eee', width: '70%', marginBottom:8, borderRadius:6}} />
                  <div style={{height: 10, background: '#eee', width: '100%', marginBottom:8, borderRadius:6}} />
                  <div style={{height: 28, background: '#eee', width: '30%', borderRadius:6}} />
                </div>
              </div>
            ))
          ) : (
            courses.map((course) => (
              <div className="course-card-slide" role="listitem" key={course.id || course._id}>
                <div className="course-card-inner">
                  <div className="card-banner">
                    <img
                      src={course.image || 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s='}
                      alt={course.title}
                    />
                    <div className="card-banner-meta">
                      <span className="tag">{course.category || 'Course'}</span>
                      <span className="price">₹{course.price ?? '---'}</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{course.title}</h4>
                    <p className="card-desc">{course.description}</p>
                    <div className="card-footer">
                      <Link to="/courses" className="btn-link">View</Link>
                      <div className="actions">
                        <a className="btn-outline">Details</a>
                        <button className="btn-primary">Enroll</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          </div>
      </section>
    </div>
  );
};

export default Home;
