import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';
import { initializeSocket } from './socket/socketHandler.js';
import logger from './utils/logger.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    logger.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Start server
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Initialize Socket.io
const io = initializeSocket(server);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

export { io };
