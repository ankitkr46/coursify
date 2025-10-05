const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/courses', authMiddleware, userController.getCourses);
router.post('/courses/:courseId', authMiddleware, userController.purchaseCourse);
router.get('/purchasedCourses', authMiddleware, userController.getPurchasedCourses);

module.exports = router;