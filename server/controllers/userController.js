const User = require('../models/User');
const Course = require('../models/Course');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'coursify_secret';

exports.signup = async (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const user = new User({ username, password, name });
  await user.save();
  const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' });
  res.json({ message: 'User created successfully', token, user: { username: user.username, name: user.name } });
};

exports.login = async (req, res) => {
  // support credentials in headers (existing client) or in body (preferred)
  const username = req.headers.username || req.body.username;
  const password = req.headers.password || req.body.password;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  const user = await User.findOne({ username });
  if (!user) return res.status(403).json({ message: 'Invalid credentials' });
  let match = false;
  try {
    match = await user.comparePassword(password);
  } catch (e) {
    match = false;
  }
  // legacy fallback: if stored password was plaintext (before hashing), allow and upgrade
  if (!match && user.password && user.password === password) {
    // upgrade: set plain password again so pre-save hook will hash it
    user.password = password;
    await user.save();
    match = true;
  }
  if (!match) return res.status(403).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' });
  res.json({ message: 'Logged in successfully', token, user: { username: user.username, name: user.name } });
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

exports.me = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: { username: user.username, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (typeof name === 'string') user.name = name;
    await user.save();
    res.json({ message: 'Profile updated', user: { username: user.username, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};