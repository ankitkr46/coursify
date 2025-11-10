import React from "react";
import "./styles/global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Courses from "./components/courses/Courses";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Forum from "./pages/Forum";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CourseDetails from "./pages/CourseDetails";
import Purchase from "./pages/Purchase";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
  <Route path="/purchase" element={<Purchase />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
