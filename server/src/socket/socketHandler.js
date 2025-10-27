import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      credentials: true,
    },
  });

  // Socket.io authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new Error('Authentication error: Token required'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.userId}`);

    // Join user to their personal room
    socket.join(`user:${socket.userId}`);

    // Join course room
    socket.on('join-course', (courseId) => {
      socket.join(`course:${courseId}`);
      logger.info(`User ${socket.userId} joined course ${courseId}`);
    });

    // Leave course room
    socket.on('leave-course', (courseId) => {
      socket.leave(`course:${courseId}`);
      logger.info(`User ${socket.userId} left course ${courseId}`);
    });

    // Send message in course discussion
    socket.on('send-message', (data) => {
      const { courseId, message, timestamp } = data;
      
      io.to(`course:${courseId}`).emit('new-message', {
        userId: socket.userId,
        message,
        timestamp,
        courseId,
      });
    });

    // Typing indicator
    socket.on('typing', (data) => {
      const { courseId, isTyping } = data;
      socket.to(`course:${courseId}`).emit('user-typing', {
        userId: socket.userId,
        isTyping,
      });
    });

    // Send notification to specific user
    socket.on('send-notification', (data) => {
      const { recipientId, notification } = data;
      io.to(`user:${recipientId}`).emit('new-notification', notification);
    });

    // Live session events (for future live classes)
    socket.on('join-live-session', (sessionId) => {
      socket.join(`session:${sessionId}`);
      socket.to(`session:${sessionId}`).emit('user-joined-session', {
        userId: socket.userId,
      });
    });

    socket.on('leave-live-session', (sessionId) => {
      socket.leave(`session:${sessionId}`);
      socket.to(`session:${sessionId}`).emit('user-left-session', {
        userId: socket.userId,
      });
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.userId}`);
    });

    // Error handler
    socket.on('error', (error) => {
      logger.error('Socket error:', error);
    });
  });

  return io;
};

// Helper function to send notification via socket
export const sendSocketNotification = (io, userId, notification) => {
  io.to(`user:${userId}`).emit('new-notification', notification);
};

// Helper function to broadcast to course
export const broadcastToCourse = (io, courseId, event, data) => {
  io.to(`course:${courseId}`).emit(event, data);
};
