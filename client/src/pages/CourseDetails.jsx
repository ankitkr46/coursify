import React from "react";
import { Navigate } from "react-router-dom";

// Course details page removed — redirecting to the main courses listing.
const CourseDetails = () => <Navigate to="/courses" replace />;

export default CourseDetails;
