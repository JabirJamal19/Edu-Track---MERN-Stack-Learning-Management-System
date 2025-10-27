# 📈 Scalability Guide - EduTrack LMS

## Overview
Strategies and best practices for scaling EduTrack to handle thousands of concurrent users and growing data volumes.

---

## Scalability Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CloudFlare CDN                       │
│           (Static Assets + DDoS Protection)             │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐       ┌───────▼────────┐
│  Load Balancer │       │  Load Balancer │
│    (Primary)   │       │   (Failover)   │
└───────┬────────┘       └───────┬────────┘
        │                         │
        └──────────┬──────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌───────▼────────┐   (Auto-scaling)
│  API Server 1  │   │  API Server 2  │   ┌──────────┐
│   (Node.js)    │   │   (Node.js)    │...│ Server N │
└───────┬────────┘   └───────┬────────┘   └──────────┘
        │                     │
        └──────────┬──────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
┌───▼────┐  ┌─────▼─────┐  ┌────▼─────┐
│ Redis  │  │  MongoDB  │  │   S3     │
│ Cache  │  │  Cluster  │  │  Files   │
└────────┘  └───────────┘  └──────────┘
```

---

## 1. Load Balancing

### Application Load Balancer (AWS ALB)

```javascript
// Health check endpoint
// server/src/routes/healthRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import redis from '../config/redis.js';

const router = express.Router();

router.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
    checks: {
      database: 'down',
      cache: 'down',
      memory: 'ok'
    }
  };

  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState === 1) {
      health.checks.database = 'up';
    }

    // Check Redis connection
    const pong = await redis.ping();
    if (pong === 'PONG') {
      health.checks.cache = 'up';
    }

    // Check memory usage
    const used = process.memoryUsage();
    const memoryUsage = Math.round(used.heapUsed / used.heapTotal * 100);
    
    if (memoryUsage > 90) {
      health.checks.memory = 'high';
    }

    const isHealthy = Object.values(health.checks).every(v => v !== 'down');
    
    res.status(isHealthy ? 200 : 503).json(health);
  } catch (error) {
    health.status = 'ERROR';
    res.status(503).json(health);
  }
});

export default router;
```

### Session Affinity (Sticky Sessions)

```javascript
// For Socket.io connections
// Configure ALB to use sticky sessions based on cookies

// server/src/socket/socketHandler.js
import { Server } from 'socket.io';
import redisAdapter from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  });

  // Redis adapter for multi-server socket.io
  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();

  Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(redisAdapter(pubClient, subClient));
  });

  return io;
};
```

---

## 2. Caching Strategy

### Multi-Layer Caching

```
┌────────────────────────────────────┐
│     Client-Side Cache              │
│  (React Query, LocalStorage)       │
└─────────────┬──────────────────────┘
              │
┌─────────────▼──────────────────────┐
│      CDN Cache                      │
│  (Static Assets, Images)            │
└─────────────┬──────────────────────┘
              │
┌─────────────▼──────────────────────┐
│      Redis Cache                    │
│  (API Responses, Sessions)          │
└─────────────┬──────────────────────┘
              │
┌─────────────▼──────────────────────┐
│      Database                       │
│      (MongoDB)                      │
└────────────────────────────────────┘
```

### Redis Caching Implementation

```javascript
// server/src/middleware/cache.js
import redis from '../config/redis.js';

export const cacheMiddleware = (duration = 300) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedResponse = await redis.get(key);

      if (cachedResponse) {
        return res.json(JSON.parse(cachedResponse));
      }

      // Store original res.json
      const originalJson = res.json.bind(res);

      // Override res.json
      res.json = (body) => {
        redis.setex(key, duration, JSON.stringify(body));
        return originalJson(body);
      };

      next();
    } catch (error) {
      next();
    }
  };
};

// Usage
router.get('/courses', cacheMiddleware(600), getCourses); // Cache for 10 minutes
```

### Cache Invalidation

```javascript
// server/src/utils/cacheInvalidator.js
import redis from '../config/redis.js';

export const invalidateCache = async (pattern) => {
  const keys = await redis.keys(pattern);
  
  if (keys.length > 0) {
    await redis.del(...keys);
  }
};

// Invalidate course cache when course is updated
export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
  // Invalidate related caches
  await invalidateCache('cache:/api/v1/courses*');
  await invalidateCache(`cache:/api/v1/courses/${req.params.id}`);
  
  res.json(course);
};
```

### Client-Side Caching (React Query)

```javascript
// client/src/utils/queryClient.js
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Usage in components
import { useQuery } from '@tanstack/react-query';

const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await api.get('/courses');
      return data;
    },
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
};
```

---

## 3. Database Optimization

### Indexing Strategy

```javascript
// server/src/models/Course.js

// Single field indexes
courseSchema.index({ instructor: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ createdAt: -1 });

// Compound indexes
courseSchema.index({ instructor: 1, status: 1 });
courseSchema.index({ category: 1, level: 1 });

// Text index for search
courseSchema.index({ title: 'text', description: 'text' });

// Geospatial index (if needed)
// courseSchema.index({ location: '2dsphere' });
```

### Query Optimization

```javascript
// ❌ BAD: N+1 Query Problem
const courses = await Course.find();
for (const course of courses) {
  course.instructor = await User.findById(course.instructor); // Multiple queries!
}

// ✅ GOOD: Use populate
const courses = await Course.find()
  .populate('instructor', 'firstName lastName email')
  .lean(); // Convert to plain JS object for better performance

// ✅ GOOD: Pagination
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 20;
const skip = (page - 1) * limit;

const courses = await Course.find()
  .skip(skip)
  .limit(limit)
  .select('-__v') // Exclude version field
  .lean();

const total = await Course.countDocuments();

res.json({
  courses,
  pagination: {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit)
  }
});
```

### Connection Pooling

```javascript
// server/src/config/database.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 50, // Increase pool size for production
      minPoolSize: 10,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

### Database Sharding (Future Scaling)

```javascript
// Shard by user_id for horizontal partitioning
// MongoDB Atlas supports automatic sharding

// Define shard key
db.adminCommand({
  shardCollection: "edutrack.users",
  key: { _id: "hashed" }
});

db.adminCommand({
  shardCollection: "edutrack.courses",
  key: { instructor: 1, _id: 1 }
});
```

---

## 4. Asynchronous Processing

### Message Queue (Bull + Redis)

```javascript
// server/src/queues/emailQueue.js
import Queue from 'bull';

export const emailQueue = new Queue('email', process.env.REDIS_URL);

// Process email jobs
emailQueue.process(async (job) => {
  const { to, subject, template, data } = job.data;
  
  // Send email
  await sendEmail(to, subject, template, data);
  
  return { sent: true };
});

// Add job to queue
export const queueEmail = (emailData) => {
  return emailQueue.add(emailData, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
};

// Usage in controller
export const enrollInCourse = async (req, res) => {
  const enrollment = await Enrollment.create({
    student: req.user.id,
    course: req.params.courseId
  });

  // Queue email instead of sending synchronously
  await queueEmail({
    to: req.user.email,
    subject: 'Course Enrollment Confirmation',
    template: 'enrollment',
    data: { enrollment }
  });

  res.json({ success: true, enrollment });
};
```

### Background Jobs

```javascript
// server/src/jobs/certificateGenerator.js
import Queue from 'bull';
import PDFDocument from 'pdfkit';

export const certificateQueue = new Queue('certificate', process.env.REDIS_URL);

certificateQueue.process(async (job) => {
  const { studentId, courseId } = job.data;
  
  // Generate certificate
  const certificate = await generateCertificate(studentId, courseId);
  
  // Upload to S3
  const url = await uploadToS3(certificate);
  
  // Update enrollment record
  await Enrollment.findOneAndUpdate(
    { student: studentId, course: courseId },
    { certificateUrl: url }
  );
  
  return { certificateUrl: url };
});
```

---

## 5. CDN Integration

### CloudFlare CDN Setup

```javascript
// Configure cache headers
// server/src/middleware/cacheHeaders.js

export const setCacheHeaders = (req, res, next) => {
  // Static assets - cache for 1 year
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$/)) {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // API responses - cache for 5 minutes
  else if (req.url.startsWith('/api/')) {
    res.set('Cache-Control', 'public, max-age=300');
  }
  
  next();
};

app.use(setCacheHeaders);
```

### Image Optimization

```javascript
// Use Cloudinary or AWS Lambda for image optimization

// server/src/utils/imageOptimizer.js
import sharp from 'sharp';

export const optimizeImage = async (buffer) => {
  return await sharp(buffer)
    .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
};

// Upload optimized image
export const uploadOptimizedImage = async (file) => {
  const optimized = await optimizeImage(file.buffer);
  return await uploadToS3(optimized, 'image/webp');
};
```

---

## 6. API Optimization

### GraphQL for Efficient Data Fetching

```javascript
// server/src/graphql/schema.js
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Course {
    id: ID!
    title: String!
    description: String
    instructor: User!
    modules: [Module!]!
  }

  type Query {
    course(id: ID!): Course
    courses(limit: Int, offset: Int): [Course!]!
  }
`);

// Resolvers with DataLoader to prevent N+1 queries
import DataLoader from 'dataloader';

const userLoader = new DataLoader(async (userIds) => {
  const users = await User.find({ _id: { $in: userIds } });
  return userIds.map(id => users.find(u => u._id.equals(id)));
});

const resolvers = {
  course: async ({ id }) => {
    return await Course.findById(id);
  },
  Course: {
    instructor: async (course) => {
      return await userLoader.load(course.instructor);
    }
  }
};
```

### Response Compression

```javascript
// server/src/app.js
import compression from 'compression';

app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6 // Compression level (0-9)
}));
```

---

## 7. Frontend Optimization

### Code Splitting

```javascript
// client/src/App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Virtual Scrolling for Large Lists

```javascript
// client/src/components/CourseList.jsx
import { FixedSizeList } from 'react-window';

const CourseList = ({ courses }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <CourseCard course={courses[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={courses.length}
      itemSize={150}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};
```

### Service Worker for Offline Support

```javascript
// client/src/serviceWorker.js
const CACHE_NAME = 'edutrack-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

---

## 8. Auto-Scaling

### AWS Auto Scaling Configuration

```javascript
// Auto Scaling Policy based on CPU utilization

{
  "AutoScalingGroupName": "edutrack-api-asg",
  "MinSize": 2,
  "MaxSize": 10,
  "DesiredCapacity": 2,
  "HealthCheckType": "ELB",
  "HealthCheckGracePeriod": 300,
  
  "ScalingPolicies": [
    {
      "PolicyName": "scale-up",
      "AdjustmentType": "ChangeInCapacity",
      "ScalingAdjustment": 2,
      "Cooldown": 300,
      "MetricAggregationType": "Average",
      "Alarms": [{
        "MetricName": "CPUUtilization",
        "Threshold": 70,
        "ComparisonOperator": "GreaterThanThreshold"
      }]
    },
    {
      "PolicyName": "scale-down",
      "AdjustmentType": "ChangeInCapacity",
      "ScalingAdjustment": -1,
      "Cooldown": 300,
      "MetricAggregationType": "Average",
      "Alarms": [{
        "MetricName": "CPUUtilization",
        "Threshold": 30,
        "ComparisonOperator": "LessThanThreshold"
      }]
    }
  ]
}
```

---

## 9. Monitoring & Performance

### Application Performance Monitoring

```javascript
// server/src/monitoring/metrics.js
import client from 'prom-client';

const register = new client.Registry();

// Custom metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
  registers: [register]
});

// Middleware to track request duration
export const metricsMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });

  next();
};

// Metrics endpoint
export const getMetrics = async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};
```

---

## 10. Microservices Migration Path

### Monolith to Microservices

```
Phase 1: Monolith (Current)
┌────────────────────────────┐
│     EduTrack API           │
│  (All services together)   │
└────────────────────────────┘

Phase 2: Modular Monolith
┌────────────────────────────┐
│  ┌──────────────────────┐  │
│  │   Auth Service       │  │
│  ├──────────────────────┤  │
│  │   Course Service     │  │
│  ├──────────────────────┤  │
│  │   User Service       │  │
│  └──────────────────────┘  │
└────────────────────────────┘

Phase 3: Microservices
┌──────────┐  ┌──────────┐  ┌──────────┐
│   Auth   │  │  Course  │  │   User   │
│ Service  │  │ Service  │  │ Service  │
└──────────┘  └──────────┘  └──────────┘
      │              │             │
      └──────────────┴─────────────┘
                     │
            ┌────────▼────────┐
            │  API Gateway    │
            └─────────────────┘
```

---

## Performance Benchmarks

### Target Metrics
- **Response Time**: < 200ms (P95)
- **Throughput**: > 1000 requests/second
- **Concurrent Users**: > 10,000
- **Database Queries**: < 50ms (P95)
- **Cache Hit Rate**: > 80%
- **Uptime**: 99.9%

---

_Related: [ARCHITECTURE.md](./ARCHITECTURE.md) | [TESTING.md](./TESTING.md) | [DEPLOYMENT.md](./DEPLOYMENT.md) | [SECURITY.md](./SECURITY.md)_
