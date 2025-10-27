# ⚡ Quick Start Guide - EduTrack LMS

Get EduTrack up and running in **5 minutes**!

---

## 🚀 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** (optional)

---

## 📦 Installation (One Command)

```bash
# Navigate to project directory
cd "d:\MERN Projects\Edu Track - A Learning Management System"

# Install all dependencies (root, server, and client)
npm run install-all
```

---

## ⚙️ Configuration

### 1. Backend Environment Variables

```bash
# Copy example file
cp server/.env.example server/.env
```

**Edit `server/.env`** with minimum required values:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Use MongoDB Atlas (free) or local MongoDB
MONGODB_URI=mongodb://localhost:27017/edutrack

# Generate random secrets (32+ characters)
JWT_SECRET=your_very_long_secret_key_here_min_32_chars
JWT_REFRESH_SECRET=your_very_long_refresh_secret_here_min_32_chars

# Email (optional - use Mailtrap for testing)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_password
```

### 2. Frontend Environment Variables

```bash
# Copy example file
cp client/.env.example client/.env
```

**Edit `client/.env`:**

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=EduTrack
```

---

## 🎯 Run the Application

### Option 1: Run Both Servers Together (Recommended)

```bash
npm run dev
```

This starts both frontend (port 3000) and backend (port 5000) concurrently.

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

---

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/v1
- **Health Check**: http://localhost:5000/api/v1/health

---

## 👤 Test Users (After Seeding - Optional)

You can create test users or use the registration page:

### Register a New User
1. Go to http://localhost:3000/register
2. Fill in the form
3. Select role: **Student** or **Instructor**
4. Click "Create Account"

### Test Login Credentials (If you seed the database)

Create a seed file to add test users:

```javascript
// server/seeds/testUsers.js
import User from '../src/models/User.js';
import connectDB from '../src/config/database.js';

const seedUsers = async () => {
  await connectDB();
  
  await User.create([
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@edutrack.com',
      password: 'Admin@123',
      role: 'admin',
      emailVerified: true,
    },
    {
      firstName: 'John',
      lastName: 'Instructor',
      email: 'instructor@edutrack.com',
      password: 'Instructor@123',
      role: 'instructor',
      emailVerified: true,
    },
    {
      firstName: 'Jane',
      lastName: 'Student',
      email: 'student@edutrack.com',
      password: 'Student@123',
      role: 'student',
      emailVerified: true,
    },
  ]);
  
  console.log('✅ Users seeded successfully');
  process.exit(0);
};

seedUsers();
```

Run: `node server/seeds/testUsers.js`

Then login with:
- **Admin**: admin@edutrack.com / Admin@123
- **Instructor**: instructor@edutrack.com / Instructor@123
- **Student**: student@edutrack.com / Student@123

---

## 📱 What You'll See

### Home Page
- Hero section
- Feature highlights
- Course browse option
- Login/Register buttons

### Student Dashboard
- Enrolled courses
- Progress tracking
- Upcoming assignments
- Certificates

### Instructor Dashboard
- My courses
- Student analytics
- Revenue tracking
- Course creation

### Admin Dashboard
- User management
- Course approvals
- Platform analytics
- System settings

---

## 🛠️ Development Commands

```bash
# Run both frontend and backend
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client

# Run tests (backend)
cd server && npm test

# Run tests (frontend)
cd client && npm test

# Build frontend for production
npm run build

# Lint code
cd server && npm run lint
cd client && npm run lint
```

---

## 🐛 Common Issues & Fixes

### Port Already in Use

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error

1. **Local MongoDB**: Ensure MongoDB is running
   ```bash
   mongod
   ```

2. **MongoDB Atlas**: 
   - Check connection string
   - Verify network access (whitelist your IP)
   - Check database user credentials

### Module Not Found

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm run install-all
```

### CORS Error

- Verify `CLIENT_URL` in `server/.env` matches your frontend URL
- Check CORS configuration in `server/src/app.js`

---

## 📚 Next Steps

1. **Read Documentation**:
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System design and structure
   - [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Detailed development guide
   - [TESTING.md](./TESTING.md) - Testing strategies
   - [SECURITY.md](./SECURITY.md) - Security best practices
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment

2. **Explore Features**:
   - Create a course (as instructor)
   - Enroll in a course (as student)
   - Take a quiz
   - View analytics (as admin)

3. **Customize**:
   - Update branding (colors, logo)
   - Add new features
   - Integrate payment gateway
   - Add more course types

4. **Deploy**:
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup

---

## 🆘 Need Help?

- **Documentation**: Check the `/docs` folder
- **Issues**: Create an issue on GitHub
- **Email**: support@edutrack.com (update with your email)

---

## 🎉 You're Ready!

Your EduTrack LMS is now running. Start creating courses, enrolling students, and building your educational platform!

**Happy Teaching & Learning! 📚**
