import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Health check endpoint
router.get('/', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
    environment: process.env.NODE_ENV,
    checks: {
      database: 'down',
      memory: 'ok',
    },
  };

  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState === 1) {
      health.checks.database = 'up';
    }

    // Check memory usage
    const used = process.memoryUsage();
    const memoryUsage = Math.round((used.heapUsed / used.heapTotal) * 100);

    if (memoryUsage > 90) {
      health.checks.memory = 'high';
    }

    const isHealthy = Object.values(health.checks).every((v) => v !== 'down');

    res.status(isHealthy ? 200 : 503).json(health);
  } catch (error) {
    health.status = 'ERROR';
    health.error = error.message;
    res.status(503).json(health);
  }
});

export default router;
