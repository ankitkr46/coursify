const User = require('../models/User');
const Course = require('../models/Course');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'coursify_secret';

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const user = new User({ username, password });
  await user.save();
  const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' });
  res.json({ message: 'User created successfully', token });
};

exports.login = async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid credentials' });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
};

exports.purchaseCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const user = await User.findOne({ username: req.user.username });
  const course = await Course.findOne({ _id: courseId, published: true });
  if (course && user) {
    if (!user.purchasedCourses.includes(courseId)) {
      user.purchasedCourses.push(courseId);
      await user.save();
    }
    res.json({ message: 'Course purchased successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

exports.getPurchasedCourses = async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};