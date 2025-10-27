import express from 'express';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/v1/courses
// @desc    Get all courses
// @access  Public
router.get('/', optionalAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get all courses - To be implemented',
  });
});

// @route   POST /api/v1/courses
// @desc    Create new course
// @access  Private/Instructor
router.post('/', protect, authorize('instructor', 'admin'), (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Create course - To be implemented',
  });
});

// @route   GET /api/v1/courses/:id
// @desc    Get single course
// @access  Public
router.get('/:id', optionalAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get course by ID - To be implemented',
  });
});

// @route   PUT /api/v1/courses/:id
// @desc    Update course
// @access  Private/Instructor/Admin
router.put('/:id', protect, authorize('instructor', 'admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update course - To be implemented',
  });
});

// @route   DELETE /api/v1/courses/:id
// @desc    Delete course
// @access  Private/Instructor/Admin
router.delete('/:id', protect, authorize('instructor', 'admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Delete course - To be implemented',
  });
});

export default router;
