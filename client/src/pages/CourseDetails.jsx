import React from "react";
import { useParams, Link } from "react-router-dom";

// Sample syllabus and projects for demo
const courseDetailsData = {
	'web-1': {
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

const CourseDetails = () => {
	const { courseId } = useParams();
	const details = courseDetailsData[courseId] || null;

	if (!details) {
		return (
			<div style={{ padding: 32 }}>
				<h2>Course Not Found</h2>
				<p>This course does not exist or details are unavailable.</p>
				<Link to="/courses">Back to Courses</Link>
			</div>
		);
	}

	return (
		<div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.07)', padding: 32 }}>
			<h2 style={{ marginBottom: 8 }}>Course Syllabus & Projects</h2>
			<h3 style={{ color: '#2563eb', marginBottom: 18 }}>{courseId.replace(/-.*/, '').toUpperCase()} — Taught by {details.teacher}</h3>
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
			<Link to="/courses" style={{ color: '#2563eb', textDecoration: 'underline' }}>← Back to Courses</Link>
		</div>
	);
};

export default CourseDetails;
