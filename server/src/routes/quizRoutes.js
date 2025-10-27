import express from 'express';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// Quiz routes - To be implemented
router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Get quizzes - To be implemented' });
});

router.post('/', authorize('instructor', 'admin'), (req, res) => {
  res.status(201).json({ success: true, message: 'Create quiz - To be implemented' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, message: 'Get quiz - To be implemented' });
});

router.put('/:id', authorize('instructor', 'admin'), (req, res) => {
  res.status(200).json({ success: true, message: 'Update quiz - To be implemented' });
});

router.delete('/:id', authorize('instructor', 'admin'), (req, res) => {
  res.status(200).json({ success: true, message: 'Delete quiz - To be implemented' });
});

export default router;
