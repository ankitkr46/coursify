const Admin = require('../models/Admin');
const Course = require('../models/Course');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'coursify_secret';

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    return res.status(409).json({ message: 'Admin already exists' });
  }
  const admin = new Admin({ username, password });
  await admin.save();
  const token = jwt.sign({ username, role: 'admin' }, secret, { expiresIn: '1h' });
  res.json({ message: 'Admin created successfully', token });
};

exports.login = async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, secret, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid credentials' });
  }
};

exports.createCourse = async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: 'Course created successfully', courseId: course._id });
};

exports.editCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (course) {
    Object.assign(course, req.body);
    await course.save();
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
};