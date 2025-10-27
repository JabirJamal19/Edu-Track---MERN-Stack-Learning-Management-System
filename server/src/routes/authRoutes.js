import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
  body('role').optional().isIn(['student', 'instructor', 'admin']).withMessage('Invalid role'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

export default router;
