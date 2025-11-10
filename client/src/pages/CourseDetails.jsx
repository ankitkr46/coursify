import React from "react";
import { useParams, Link } from "react-router-dom";

// Sample syllabus and projects for demo
const courseDetailsData = {
	'web-1': {
		title: 'Frontend Web Development',
		price: 4999,
		syllabus: [
			"HTML & CSS Fundamentals",
			"JavaScript Basics",
			"Responsive Design",
			"React Introduction",
			"Building UI Components"
		],
		projects: [
			"Personal Portfolio Website",
			"Responsive Blog Page",
			"Mini React Todo App"
		],
		teacher: "Amit Sharma"
	},
	'web-2': {
		title: 'Fullstack MERN Bootcamp',
		price: 9999,
		syllabus: [
			"Node.js & Express",
			"MongoDB & Mongoose",
			"REST APIs",
			"React Advanced",
			"Fullstack Deployment"
		],
		projects: [
			"MERN Stack E-commerce",
			"Blog Platform",
			"Authentication System"
		],
		teacher: "Priya Verma"
	},
	'bc-1': {
		title: 'Blockchain & Smart Contracts',
		price: 12999,
		syllabus: [
			"Blockchain Basics",
			"Solidity Programming",
			"Smart Contracts",
			"DApp Development",
			"Web3 Integration"
		],
		projects: [
			"ERC-20 Token",
			"Voting DApp",
			"NFT Marketplace"
		],
		teacher: "Rahul Singh"
	},
	'devops-1': {
		title: 'DevOps Fundamentals',
		price: 7999,
		syllabus: [
			"Linux & Shell Scripting",
			"Docker Fundamentals",
			"CI/CD Pipelines",
			"Kubernetes Basics",
			"Cloud Deployments"
		],
		projects: [
			"Dockerized Web App",
			"CI/CD with GitHub Actions",
			"Kubernetes Cluster Setup"
		],
		teacher: "Sneha Reddy"
	},
	'devops-2': {
		title: 'Advanced SRE & Kubernetes',
		price: 14999,
		syllabus: [
			"SRE Principles",
			"Advanced Kubernetes",
			"Monitoring & Observability",
			"Scaling Applications",
			"Disaster Recovery"
		],
		projects: [
			"Prometheus Monitoring",
			"Auto-scaling Demo",
			"Production Incident Simulation"
		],
		teacher: "Vikram Gupta"
	}
};

import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const CourseDetails = () => {
	const { courseId } = useParams();
	const details = courseDetailsData[courseId] || null;
	const navigate = useNavigate();

	if (!details) {
		return (
			<div style={{ padding: 32 }}>
				<h2>Course Not Found</h2>
				<p>This course does not exist or details are unavailable.</p>
				<Link to="/courses">Back to Courses</Link>
			</div>
		);
	}

	function addToCart() {
		const cart = JSON.parse(localStorage.getItem('cart') || '[]');
		const exists = cart.find(c => c.id === courseId);
		if (exists) {
			alert('Course already in cart');
			return;
		}
		cart.push({ id: courseId, title: details.title, price: details.price });
		localStorage.setItem('cart', JSON.stringify(cart));
		alert('Added to cart');
		// notify other components (navbar) in same tab
		window.dispatchEvent(new CustomEvent('cart-updated'));
	}

	function buyNow() {
		// Add to cart then go to purchase page
		const cart = JSON.parse(localStorage.getItem('cart') || '[]');
		const exists = cart.find(c => c.id === courseId);
		if (!exists) cart.push({ id: courseId, title: details.title, price: details.price });
		localStorage.setItem('cart', JSON.stringify(cart));
		// notify navbar
		window.dispatchEvent(new CustomEvent('cart-updated'));
		navigate('/purchase');
	}

	return (
		<div style={{ maxWidth: 700, margin: '40px auto', background: 'var(--card-bg)', borderRadius: 12, boxShadow: 'var(--shadow)', padding: 32 }}>
			<h2 style={{ marginBottom: 8 }}>{details.title}</h2>
			<h3 style={{ color: 'var(--brand)', marginBottom: 18 }}>₹{details.price} — Taught by {details.teacher}</h3>
			<div style={{ marginBottom: 24 }}>
				<h4>Syllabus</h4>
				<ul style={{ paddingLeft: 20 }}>
					{details.syllabus.map((topic, i) => (
						<li key={i} style={{ marginBottom: 6 }}>{topic}</li>
					))}
				</ul>
			</div>
			<div style={{ marginBottom: 24 }}>
				<h4>Projects</h4>
				<ul style={{ paddingLeft: 20 }}>
					{details.projects.map((proj, i) => (
						<li key={i} style={{ marginBottom: 6 }}>{proj}</li>
					))}
				</ul>
			</div>
			<div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
				<button onClick={addToCart} className="btn-primary">Add to Cart</button>
				<button onClick={buyNow} className="btn-outline">Buy Now</button>
				<Link to="/courses" style={{ color: 'var(--brand)', textDecoration: 'underline', alignSelf: 'center' }}>← Back to Courses</Link>
			</div>
		</div>
	);
};

export default CourseDetails;
