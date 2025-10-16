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
  const res = await API.get('/users/courses');
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
            Upgrade Your Coding Skills with <span className="brand">Coursify</span>
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

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Students Say</h2>
        <p className="testimonials-subtitle">Join thousands of learners who transformed their careers with Coursify</p>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <img src="https://i.pravatar.cc/100?img=33" alt="Priya Sharma" className="testimonial-avatar" />
              <div className="testimonial-info">
                <h4>Priya Sharma</h4>
                <p className="testimonial-role">Full Stack Developer</p>
              </div>
            </div>
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "Coursify completely changed my career trajectory. The MERN stack bootcamp was incredibly detailed and the mentors were always available to help. Got placed at a top tech company within 3 months!"
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <img src="https://i.pravatar.cc/100?img=12" alt="Rahul Verma" className="testimonial-avatar" />
              <div className="testimonial-info">
                <h4>Rahul Verma</h4>
                <p className="testimonial-role">Blockchain Developer</p>
              </div>
            </div>
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "The blockchain course exceeded my expectations. From basics to building real DApps, everything was covered. The community support is amazing and I'm now working on Web3 projects!"
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <img src="https://i.pravatar.cc/100?img=47" alt="Ananya Patel" className="testimonial-avatar" />
              <div className="testimonial-info">
                <h4>Ananya Patel</h4>
                <p className="testimonial-role">DevOps Engineer</p>
              </div>
            </div>
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "Best investment I made for my career! The DevOps fundamentals course gave me hands-on experience with Docker, Kubernetes, and CI/CD. Landed my dream job as a DevOps engineer!"
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <img src="https://i.pravatar.cc/100?img=68" alt="Arjun Singh" className="testimonial-avatar" />
              <div className="testimonial-info">
                <h4>Arjun Singh</h4>
                <p className="testimonial-role">Frontend Developer</p>
              </div>
            </div>
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "The frontend development course was a game-changer. Clear explanations, real-world projects, and excellent support. I went from zero to building production-ready React apps in just 8 weeks!"
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <img src="https://i.pravatar.cc/100?img=25" alt="Sneha Reddy" className="testimonial-avatar" />
              <div className="testimonial-info">
                <h4>Sneha Reddy</h4>
                <p className="testimonial-role">Software Engineer</p>
              </div>
            </div>
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "Coursify's teaching methodology is top-notch. The projects are industry-relevant and the doubt-clearing sessions are super helpful. Highly recommend to anyone serious about coding!"
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <img src="https://i.pravatar.cc/100?img=51" alt="Vikram Gupta" className="testimonial-avatar" />
              <div className="testimonial-info">
                <h4>Vikram Gupta</h4>
                <p className="testimonial-role">Tech Lead</p>
              </div>
            </div>
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "Even as an experienced developer, I learned so much from the advanced courses. The depth of content and practical approach helped me level up my skills significantly!"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
