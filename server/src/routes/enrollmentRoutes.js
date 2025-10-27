import express from 'express';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// @route   POST /api/v1/enrollments
// @desc    Enroll in a course
// @access  Private/Student
router.post('/', authorize('student'), (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Enroll in course - To be implemented',
  });
});

// @route   GET /api/v1/enrollments
// @desc    Get user enrollments
// @access  Private
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get user enrollments - To be implemented',
  });
});

// @route   GET /api/v1/enrollments/:id
// @desc    Get enrollment by ID
// @access  Private
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get enrollment by ID - To be implemented',
  });
});

export default router;
