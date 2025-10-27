# 🔐 Security Guide - EduTrack LMS

## Overview
Comprehensive security implementation for EduTrack to protect user data, prevent attacks, and maintain system integrity.

---

## Security Principles

1. **Defense in Depth**: Multiple layers of security
2. **Least Privilege**: Minimum necessary access
3. **Fail Securely**: Secure defaults and error handling
4. **Input Validation**: Never trust user input
5. **Security by Design**: Built-in from the start

---

## 1. Authentication Security

### Password Security

#### Password Hashing (bcrypt)
```javascript
// server/src/models/User.js
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false // Don't return password by default
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12); // High cost factor
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

#### Password Requirements
```javascript
// server/src/validators/authValidator.js
import { body } from 'express-validator';

export const registerValidator = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
];
```

### JWT Authentication

#### Token Generation
```javascript
// server/src/utils/generateToken.js
import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { 
      expiresIn: '15m', // Short-lived access token
      issuer: 'edutrack',
      audience: 'edutrack-api'
    }
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { 
      expiresIn: '7d', // Long-lived refresh token
      issuer: 'edutrack',
      audience: 'edutrack-api'
    }
  );
};
```

#### Token Verification Middleware
```javascript
// server/src/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to access this route' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User no longer exists' 
      });
    }

    // Check if user changed password after token was issued
    if (user.passwordChangedAt && decoded.iat < user.passwordChangedAt.getTime() / 1000) {
      return res.status(401).json({ 
        success: false, 
        message: 'User recently changed password. Please login again.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};
```

#### Token Refresh Endpoint
```javascript
// server/src/controllers/authController.js
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate new access token
    const accessToken = generateAccessToken(decoded.id, decoded.role);

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};
```

### Session Management

#### Logout and Token Blacklist
```javascript
// Using Redis for token blacklist
import redis from '../config/redis.js';

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token);
    
    // Add token to blacklist with TTL
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    await redis.setex(`blacklist:${token}`, expiresIn, 'true');

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out' });
  }
};

// Middleware to check blacklist
export const checkBlacklist = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (token) {
    const isBlacklisted = await redis.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token has been revoked' });
    }
  }
  
  next();
};
```

---

## 2. Authorization (RBAC)

### Role-Based Access Control

```javascript
// server/src/middleware/roleCheck.js
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Authentication required' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role ${req.user.role} is not authorized to access this route` 
      });
    }

    next();
  };
};

// Usage in routes
router.post('/courses', 
  protect, 
  authorize('instructor', 'admin'), 
  createCourse
);
```

### Resource-Level Authorization

```javascript
// Check if user owns the resource
export const checkOwnership = (Model) => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params.id);

      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }

      // Allow if user is admin or owner
      if (req.user.role === 'admin' || 
          resource.createdBy.toString() === req.user.id) {
        req.resource = resource;
        return next();
      }

      res.status(403).json({ message: 'Not authorized to access this resource' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
};
```

---

## 3. Input Validation & Sanitization

### Express Validator

```javascript
// server/src/validators/courseValidator.js
import { body, param } from 'express-validator';
import { validationResult } from 'express-validator';

export const createCourseValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title must be less than 200 characters')
    .escape(), // Prevent XSS

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 5000 })
    .escape(),

  body('price')
    .optional()
    .isFloat({ min: 0, max: 10000 })
    .withMessage('Price must be between 0 and 10000'),

  body('category')
    .trim()
    .isIn(['programming', 'design', 'business', 'marketing', 'other'])
    .withMessage('Invalid category'),
];

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  
  next();
};

// Usage
router.post('/courses', 
  protect, 
  authorize('instructor'), 
  createCourseValidator, 
  validate, 
  createCourse
);
```

### MongoDB Injection Prevention

```javascript
// Using Mongoose with strict schemas prevents most NoSQL injections
// Additional protection:

import mongoSanitize from 'express-mongo-sanitize';

app.use(mongoSanitize()); // Remove $ and . from user input
```

---

## 4. XSS Protection

### Content Security Policy (CSP)

```javascript
// server/src/app.js
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", process.env.CLIENT_URL],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
}));
```

### Output Encoding (Frontend)

```javascript
// React automatically escapes values in JSX
// For raw HTML, use DOMPurify

import DOMPurify from 'dompurify';

const SafeHTML = ({ html }) => {
  const sanitizedHTML = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target']
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};
```

---

## 5. CSRF Protection

### CSRF Tokens

```javascript
// server/src/app.js
import csrf from 'csurf';

const csrfProtection = csrf({ 
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  } 
});

// Apply to state-changing routes
router.post('/courses', csrfProtection, createCourse);

// Endpoint to get CSRF token
router.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
```

### SameSite Cookies

```javascript
// Set cookies with SameSite attribute
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

---

## 6. Rate Limiting

### API Rate Limiting

```javascript
// server/src/middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for authentication
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 login attempts per 15 minutes
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later',
});

// Apply to routes
app.use('/api/', apiLimiter);
app.use('/api/v1/auth/login', authLimiter);
```

### Advanced Rate Limiting with Redis

```javascript
import RedisStore from 'rate-limit-redis';
import redis from './config/redis.js';

const limiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:',
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
});
```

---

## 7. File Upload Security

### Secure File Upload

```javascript
// server/src/middleware/upload.js
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|ppt|pptx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and documents are allowed.'));
  }
};

// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(), // Store in memory for S3 upload
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
});

export default upload;
```

### File Validation

```javascript
// server/src/utils/uploadToS3.js
import AWS from 'aws-sdk';
import fileType from 'file-type';
import crypto from 'crypto';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFile = async (file) => {
  // Verify file type from buffer (not just extension)
  const type = await fileType.fromBuffer(file.buffer);
  
  const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (!type || !allowedMimeTypes.includes(type.mime)) {
    throw new Error('Invalid file type');
  }

  // Generate unique filename
  const filename = `${crypto.randomBytes(16).toString('hex')}.${type.ext}`;
  
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${filename}`,
    Body: file.buffer,
    ContentType: type.mime,
    ACL: 'private', // Not publicly accessible
  };

  const result = await s3.upload(params).promise();
  return result.Location;
};

// Get signed URL for private file access
export const getSignedUrl = (key) => {
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 3600, // URL expires in 1 hour
  });
};
```

---

## 8. SQL/NoSQL Injection Prevention

### Parameterized Queries (Mongoose)

```javascript
// ✅ SAFE: Using Mongoose methods
const user = await User.findOne({ email: req.body.email });

// ✅ SAFE: Mongoose sanitizes input
const courses = await Course.find({ category: req.query.category });

// ❌ UNSAFE: Using raw operators
const user = await User.findOne({ $where: req.body.query }); // DON'T DO THIS
```

### Query Sanitization

```javascript
// server/src/middleware/sanitize.js
import mongoSanitize from 'express-mongo-sanitize';

// Remove $ and . from input
app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`Sanitized ${key} in request`);
  },
}));
```

---

## 9. Secure Communication

### HTTPS Enforcement

```javascript
// server/src/middleware/security.js
export const enforceHTTPS = (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
};

app.use(enforceHTTPS);
```

### CORS Configuration

```javascript
// server/src/app.js
import cors from 'cors';

const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = [
      process.env.CLIENT_URL,
      'https://www.edutrack.com',
      'https://edutrack.com'
    ];
    
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

---

## 10. Secrets Management

### Environment Variables

```javascript
// ❌ DON'T: Hardcode secrets
const JWT_SECRET = 'my-secret-key';

// ✅ DO: Use environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Validate required environment variables on startup
const requiredEnvVars = [
  'NODE_ENV',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});
```

### Secret Rotation

```javascript
// Implement key rotation strategy
// Store multiple valid JWT secrets for graceful rotation

const JWT_SECRETS = [
  process.env.JWT_SECRET_CURRENT,
  process.env.JWT_SECRET_PREVIOUS, // Valid during rotation period
];

// Verify with multiple secrets
const verifyToken = (token) => {
  for (const secret of JWT_SECRETS) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      continue;
    }
  }
  throw new Error('Invalid token');
};
```

---

## 11. Security Headers (Helmet)

```javascript
// server/src/app.js
import helmet from 'helmet';

app.use(helmet());

// Custom configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  frameguard: { action: 'deny' }, // Prevent clickjacking
  noSniff: true, // Prevent MIME type sniffing
  xssFilter: true, // Enable XSS filter
}));
```

---

## 12. Logging & Monitoring

### Security Event Logging

```javascript
// server/src/utils/securityLogger.js
import winston from 'winston';

const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'security' },
  transports: [
    new winston.transports.File({ filename: 'security.log' }),
  ],
});

// Log security events
export const logSecurityEvent = (event, details) => {
  securityLogger.info({
    event,
    timestamp: new Date().toISOString(),
    ...details
  });
};

// Usage
logSecurityEvent('failed_login', {
  email: req.body.email,
  ip: req.ip,
  userAgent: req.headers['user-agent']
});
```

### Failed Login Tracking

```javascript
// Track failed login attempts
import redis from '../config/redis.js';

export const trackFailedLogin = async (email, ip) => {
  const key = `failed_login:${email}:${ip}`;
  const attempts = await redis.incr(key);
  
  if (attempts === 1) {
    await redis.expire(key, 15 * 60); // 15 minutes
  }

  if (attempts >= 5) {
    // Lock account or send alert
    logSecurityEvent('account_locked', { email, ip, attempts });
    return true; // Account locked
  }

  return false;
};
```

---

## 13. Dependency Security

### Regular Updates

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

### Automated Scanning

```yaml
# .github/workflows/security.yml
name: Security Scan

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      
      - name: Run npm audit
        run: npm audit --audit-level=moderate
```

---

## 14. Security Checklist

### Pre-Production
- [ ] All secrets stored in environment variables
- [ ] HTTPS enforced on all endpoints
- [ ] JWT tokens properly secured
- [ ] Password hashing with bcrypt (cost factor ≥ 12)
- [ ] Input validation on all endpoints
- [ ] CORS configured correctly
- [ ] Rate limiting implemented
- [ ] File upload restrictions in place
- [ ] Security headers configured (Helmet)
- [ ] SQL/NoSQL injection prevention
- [ ] XSS protection enabled
- [ ] CSRF protection on state-changing requests
- [ ] Role-based access control implemented
- [ ] Error messages don't leak sensitive info
- [ ] Dependencies updated and scanned
- [ ] Logging and monitoring configured

### Post-Production
- [ ] Regular security audits
- [ ] Monitor failed login attempts
- [ ] Review access logs
- [ ] Update dependencies monthly
- [ ] Rotate secrets quarterly
- [ ] Backup verification
- [ ] Incident response plan documented
- [ ] Security training for team

---

_Related: [ARCHITECTURE.md](./ARCHITECTURE.md) | [TESTING.md](./TESTING.md) | [DEPLOYMENT.md](./DEPLOYMENT.md)_
