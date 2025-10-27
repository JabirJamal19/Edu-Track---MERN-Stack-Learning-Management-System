import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// Notification routes - To be implemented
router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Get notifications - To be implemented' });
});

router.put('/:id/read', (req, res) => {
  res.status(200).json({ success: true, message: 'Mark notification as read - To be implemented' });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ success: true, message: 'Delete notification - To be implemented' });
});

export default router;
