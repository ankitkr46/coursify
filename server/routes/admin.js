const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.post('/courses', authMiddleware, adminController.createCourse);
router.put('/courses/:courseId', authMiddleware, adminController.editCourse);
router.get('/courses', authMiddleware, adminController.getCourses);

module.exports = router;