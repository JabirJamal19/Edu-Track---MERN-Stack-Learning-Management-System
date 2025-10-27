import express from 'express';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/v1/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/', authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get all users - To be implemented',
  });
});

// @route   GET /api/v1/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get user by ID - To be implemented',
  });
});

// @route   PUT /api/v1/users/:id
// @desc    Update user (admin only)
// @access  Private/Admin
router.put('/:id', authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update user - To be implemented',
  });
});

// @route   DELETE /api/v1/users/:id
// @desc    Delete user (admin only)
// @access  Private/Admin
router.delete('/:id', authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Delete user - To be implemented',
  });
});

export default router;
