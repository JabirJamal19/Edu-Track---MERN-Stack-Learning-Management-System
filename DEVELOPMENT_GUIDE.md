# 🛠️ Development Guide - EduTrack LMS

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [API Development](#api-development)
5. [Frontend Development](#frontend-development)
6. [Database Management](#database-management)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
node --version  # v18.0.0 or higher
npm --version   # v9.0.0 or higher
git --version   # Any recent version
```

### Initial Setup

1. **Clone and Install**

```bash
cd "d:\MERN Projects\Edu Track - A Learning Management System"

# Install root dependencies
npm install

# Install all dependencies (root, server, client)
npm run install-all
```

2. **Environment Configuration**

**Server Environment** (`server/.env`)
```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

MONGODB_URI=mongodb://localhost:27017/edutrack
# OR use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edutrack

JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars

# Optional: AWS S3 (if you want file uploads)
# AWS_ACCESS_KEY_ID=your_aws_key
# AWS_SECRET_ACCESS_KEY=your_aws_secret
# AWS_REGION=us-east-1
# AWS_BUCKET_NAME=edutrack-dev

# Email (use Mailtrap for development)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_pass
```

**Client Environment** (`client/.env`)
```bash
cp client/.env.example client/.env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=EduTrack
```

3. **Database Setup**

**Option 1: Local MongoDB**
```bash
# Install MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Start MongoDB
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- Update `MONGODB_URI` in `server/.env`

4. **Start Development Servers**

```bash
# Start both frontend and backend concurrently
npm run dev

# OR start them separately

# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run client
```

5. **Access the Application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/v1
- API Health Check: http://localhost:5000/api/v1/health

---

## Project Structure

```
edutrack/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (routes)
│   │   ├── context/       # React Context for state
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Helper functions
│   │   └── styles/        # CSS files
│   └── package.json
│
├── server/                # Node.js Backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── config/       # Configuration files
│   │   └── utils/        # Helper functions
│   └── package.json
│
└── package.json          # Root package.json
```

---

## Development Workflow

### Branch Strategy

```bash
# Create feature branch
git checkout -b feature/course-enrollment

# Make changes, commit
git add .
git commit -m "feat: add course enrollment functionality"

# Push to remote
git push origin feature/course-enrollment

# Create Pull Request on GitHub
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code refactoring
test: adding tests
chore: updating build tasks, package manager configs, etc.
```

### Code Style

**Backend (ESLint)**
```bash
cd server
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

**Frontend (ESLint)**
```bash
cd client
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

---

## API Development

### Creating a New API Endpoint

1. **Create Controller** (`server/src/controllers/exampleController.js`)

```javascript
import { asyncHandler } from '../middleware/errorHandler.js';

export const getExample = asyncHandler(async (req, res) => {
  // Your logic here
  res.status(200).json({
    success: true,
    data: { message: 'Example response' }
  });
});

export const createExample = asyncHandler(async (req, res) => {
  const { name } = req.body;
  
  // Validation
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Name is required'
    });
  }
  
  // Create logic here
  res.status(201).json({
    success: true,
    data: { name }
  });
});
```

2. **Create Route** (`server/src/routes/exampleRoutes.js`)

```javascript
import express from 'express';
import { getExample, createExample } from '../controllers/exampleController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getExample);
router.post('/', protect, authorize('admin'), createExample);

export default router;
```

3. **Register Route** (`server/src/app.js`)

```javascript
import exampleRoutes from './routes/exampleRoutes.js';

app.use('/api/v1/examples', exampleRoutes);
```

### Testing API Endpoints

**Using cURL**
```bash
# GET request
curl http://localhost:5000/api/v1/health

# POST request with JSON
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Authenticated request
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Using Postman/Thunder Client**
1. Import the API collection (if available)
2. Set environment variables
3. Test endpoints

---

## Frontend Development

### Creating a New Page

1. **Create Page Component** (`client/src/pages/Example.jsx`)

```javascript
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const Example = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/examples');
        setData(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Example Page</h1>
      {/* Your content */}
    </div>
  );
};

export default Example;
```

2. **Add Route** (`client/src/App.jsx`)

```javascript
import Example from './pages/Example';

// Add route
<Route path="/example" element={<Example />} />
```

### Creating Reusable Components

**Button Component** (`client/src/components/common/Button.jsx`)

```javascript
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    danger: 'btn-danger',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

### Using React Query

```javascript
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../utils/api';

const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await api.get('/courses');
      return data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

const useEnrollCourse = () => {
  return useMutation({
    mutationFn: async (courseId) => {
      const { data } = await api.post(`/courses/${courseId}/enroll`);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['courses']);
    },
  });
};
```

---

## Database Management

### Mongoose Models Best Practices

```javascript
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    field: {
      type: String,
      required: [true, 'Field is required'],
      trim: true,
      maxlength: [100, 'Field cannot exceed 100 characters'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance
schema.index({ field: 1 });

// Virtual fields
schema.virtual('virtualField').get(function() {
  return this.field.toUpperCase();
});

// Middleware
schema.pre('save', async function(next) {
  // Run before saving
  next();
});

export default mongoose.model('ModelName', schema);
```

### Database Seeding

Create seed data for development:

**`server/seeds/seedData.js`**
```javascript
import User from '../src/models/User.js';
import Course from '../src/models/Course.js';

export const seedDatabase = async () => {
  // Clear existing data
  await User.deleteMany({});
  await Course.deleteMany({});

  // Create admin user
  await User.create({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@edutrack.com',
    password: 'Admin@123',
    role: 'admin',
    emailVerified: true,
  });

  console.log('Database seeded successfully');
};
```

**Run seeder:**
```bash
node server/seeds/seedData.js
```

---

## Testing

### Backend Testing

**Run Tests**
```bash
cd server
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage
```

**Example Test**
```javascript
import request from 'supertest';
import app from '../src/app.js';

describe('Auth Routes', () => {
  test('POST /api/v1/auth/register - should register user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Test@123',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('accessToken');
  });
});
```

### Frontend Testing

```bash
cd client
npm test
```

---

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill and restart
npm run dev
```

**MongoDB Connection Issues**
```bash
# Check MongoDB is running
mongod --version

# Check connection string in .env
# Ensure no special characters in password (URL encode if needed)
```

**CORS Errors**
- Check `CLIENT_URL` in server `.env`
- Verify CORS configuration in `server/src/app.js`

**Module Not Found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debugging

**Backend Debugging**
```javascript
import logger from './utils/logger.js';

logger.info('Info message');
logger.error('Error message', error);
logger.warn('Warning message');
```

**Frontend Debugging**
```javascript
// React Query Devtools (already included)
// Open browser and check bottom-left corner

// Redux DevTools (if using Redux)
// Install browser extension
```

---

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)

---

**Happy Coding! 🚀**
