# 🎓 EduTrack - Learning Management System Architecture

## Overview
EduTrack is a cloud-based Learning Management System built with the MERN stack, designed for educational institutions to manage courses, track student progress, and facilitate online learning.

---

## 🧠 1. Feature Requirements

### User Roles
- **Students**: Enroll in courses, view content, take quizzes, track progress
- **Instructors**: Create/manage courses, create assignments/quizzes, grade students
- **Admins**: Full platform control, user management, content moderation

### Functional Requirements

#### Authentication & Authorization
- JWT-based authentication with secure token management
- Role-based access control (RBAC) for Admin, Instructor, Student
- Password hashing using bcrypt
- Email verification and password reset functionality
- Session management and token refresh

#### Course Management
- **Instructors**:
  - Create, edit, delete courses
  - Upload course materials (videos, PDFs, documents)
  - Organize content into modules/sections
  - Set course prerequisites and enrollment limits
- **Students**:
  - Browse and search courses
  - Enroll in courses
  - Track course progress
  - Access course materials

#### Assessment System
- **Quizzes**:
  - Multiple choice, true/false, short answer questions
  - Timed quizzes with automatic submission
  - Automatic grading for objective questions
  - Quiz attempts tracking
- **Assignments**:
  - File upload submissions
  - Due date management
  - Manual grading by instructors
  - Feedback and comments

#### Progress Tracking
- Course completion percentage
- Quiz and assignment scores
- Grade book for students and instructors
- Learning analytics and insights
- Certificate generation upon course completion

#### Communication Features
- Discussion forums per course
- Real-time chat between students and instructors
- Announcements and notifications
- Private messaging system

#### Notifications
- Email notifications for:
  - Course enrollment
  - Assignment deadlines
  - Quiz availability
  - Grade updates
  - Announcements
- In-app notifications with real-time updates
- Notification preferences management

#### Admin Panel
- User management (CRUD operations)
- Course approval workflow
- Content moderation
- Platform analytics and reporting
- System configuration

### Non-Functional Requirements

#### Scalability
- Horizontal scaling support
- Database indexing for performance
- Efficient query optimization
- Support for thousands of concurrent users

#### Performance
- Page load time < 2 seconds
- API response time < 300ms
- Optimized asset delivery (lazy loading, code splitting)
- CDN for static content
- Image optimization and compression

#### Security
- HTTPS enforcement
- Input validation and sanitization
- XSS and CSRF protection
- Rate limiting on API endpoints
- Secure file upload validation
- SQL injection prevention
- Regular security audits

#### Usability
- Intuitive and responsive UI
- Mobile-first design
- Accessibility compliance (WCAG 2.1)
- Multi-language support ready
- Consistent design system

---

## 🏗️ 2. System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  (React.js + Tailwind CSS + React Router)              │
│  - Student Dashboard  - Instructor Portal  - Admin Panel│
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP/HTTPS + WebSocket
┌─────────────────▼───────────────────────────────────────┐
│                 API Gateway Layer                        │
│           (Express.js + Middleware)                      │
│  - Authentication  - Authorization  - Rate Limiting      │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│              Business Logic Layer                        │
│                 (Controllers)                            │
│  - User Controller  - Course Controller                 │
│  - Quiz Controller  - Notification Controller           │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│               Data Access Layer                          │
│              (Mongoose Models)                           │
│  - User Model  - Course Model  - Quiz Model             │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                  Database Layer                          │
│                 (MongoDB Atlas)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                External Services                         │
│  - AWS S3 (File Storage)                                │
│  - Socket.io (Real-time Communication)                  │
│  - SendGrid/Nodemailer (Email)                          │
│  - Redis (Caching)                                      │
└─────────────────────────────────────────────────────────┘
```

### Client-Side Architecture (React.js + Tailwind CSS)

#### State Management
- **Context API** for global state:
  - AuthContext (user authentication state)
  - CourseContext (course data)
  - NotificationContext (real-time notifications)
- **React Query** for server state management and caching
- Local state with useState for component-specific data

#### Routing
- React Router v6 for navigation
- Protected routes with authentication checks
- Role-based route access

#### UI Components
- Tailwind CSS for styling
- Responsive, mobile-first design
- Reusable component library
- Dark mode support

### Server-Side Architecture (Node.js + Express.js)

#### API Design
- RESTful API architecture
- Versioned APIs (e.g., /api/v1/)
- JSON request/response format
- Standard HTTP status codes

#### Middleware Stack
1. **CORS** - Cross-origin resource sharing
2. **Helmet** - Security headers
3. **Morgan** - Request logging
4. **Express.json()** - JSON parsing
5. **Authentication** - JWT verification
6. **Authorization** - Role-based access
7. **Rate Limiting** - Prevent abuse
8. **Error Handling** - Global error handler

#### Authentication Flow
```
1. User submits credentials
2. Server validates credentials
3. Server generates JWT (access + refresh tokens)
4. Client stores tokens (httpOnly cookies or localStorage)
5. Client includes token in Authorization header
6. Server validates token on each request
7. Refresh token used to get new access token
```

### Database Architecture (MongoDB)

#### Collections Schema

**Users Collection**
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique, indexed),
  password: String (hashed),
  role: String (enum: ['student', 'instructor', 'admin']),
  profile: {
    avatar: String,
    bio: String,
    phone: String,
    dateOfBirth: Date
  },
  emailVerified: Boolean,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Courses Collection**
```javascript
{
  _id: ObjectId,
  title: String (indexed),
  description: String,
  instructor: ObjectId (ref: 'User'),
  category: String (indexed),
  level: String (enum: ['beginner', 'intermediate', 'advanced']),
  thumbnail: String,
  price: Number,
  duration: Number,
  modules: [{
    title: String,
    order: Number,
    lessons: [{
      title: String,
      type: String (enum: ['video', 'document', 'quiz']),
      content: String,
      duration: Number,
      order: Number
    }]
  }],
  prerequisites: [String],
  maxStudents: Number,
  status: String (enum: ['draft', 'published', 'archived']),
  createdAt: Date,
  updatedAt: Date
}
```

**Enrollments Collection**
```javascript
{
  _id: ObjectId,
  student: ObjectId (ref: 'User'),
  course: ObjectId (ref: 'Course'),
  enrolledAt: Date,
  progress: Number (0-100),
  completedLessons: [ObjectId],
  status: String (enum: ['active', 'completed', 'dropped']),
  completedAt: Date
}
```

**Quizzes Collection**
```javascript
{
  _id: ObjectId,
  course: ObjectId (ref: 'Course'),
  title: String,
  description: String,
  timeLimit: Number,
  passingScore: Number,
  questions: [{
    question: String,
    type: String (enum: ['multiple-choice', 'true-false', 'short-answer']),
    options: [String],
    correctAnswer: String,
    points: Number
  }],
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date
}
```

**Quiz Attempts Collection**
```javascript
{
  _id: ObjectId,
  quiz: ObjectId (ref: 'Quiz'),
  student: ObjectId (ref: 'User'),
  answers: [{
    questionId: ObjectId,
    answer: String,
    isCorrect: Boolean,
    points: Number
  }],
  score: Number,
  totalPoints: Number,
  startedAt: Date,
  completedAt: Date,
  timeSpent: Number
}
```

**Assignments Collection**
```javascript
{
  _id: ObjectId,
  course: ObjectId (ref: 'Course'),
  title: String,
  description: String,
  dueDate: Date,
  maxPoints: Number,
  attachments: [String],
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date
}
```

**Submissions Collection**
```javascript
{
  _id: ObjectId,
  assignment: ObjectId (ref: 'Assignment'),
  student: ObjectId (ref: 'User'),
  files: [String],
  submittedAt: Date,
  grade: Number,
  feedback: String,
  gradedBy: ObjectId (ref: 'User'),
  gradedAt: Date
}
```

**Notifications Collection**
```javascript
{
  _id: ObjectId,
  recipient: ObjectId (ref: 'User'),
  type: String (enum: ['course', 'assignment', 'quiz', 'announcement']),
  title: String,
  message: String,
  link: String,
  read: Boolean,
  createdAt: Date
}
```

#### Database Indexes
- Users: email (unique), role
- Courses: title (text), instructor, category, status
- Enrollments: student, course, status (compound index)
- Quizzes: course
- Quiz Attempts: quiz, student (compound index)
- Notifications: recipient, read, createdAt (compound index)

### Real-Time Features

#### Socket.io Implementation
```javascript
// Events
- connection: User connects
- join-room: Join course/chat room
- send-message: Send chat message
- notification: Real-time notification
- typing: Show typing indicator
- disconnect: User disconnects
```

#### Use Cases
- Live chat in course discussion
- Real-time notifications
- Instructor-student live Q&A sessions
- Live class indicators

---

## 💻 3. Development Phases

### Phase 1: Project Setup (Week 1)
- [x] Initialize Git repository
- [ ] Set up monorepo structure
- [ ] Configure ESLint and Prettier
- [ ] Install dependencies for backend (Express, Mongoose, JWT)
- [ ] Install dependencies for frontend (React, Tailwind, React Router)
- [ ] Configure Tailwind CSS
- [ ] Set up environment variables
- [ ] Create basic folder structure

### Phase 2: User Authentication & Authorization (Week 2)
- [ ] Create User model
- [ ] Implement registration API
- [ ] Implement login API with JWT
- [ ] Implement password hashing with bcrypt
- [ ] Create authentication middleware
- [ ] Implement role-based authorization
- [ ] Build login/register UI components
- [ ] Implement protected routes
- [ ] Add email verification
- [ ] Add password reset functionality

### Phase 3: Course Management (Week 3-4)
- [ ] Create Course model
- [ ] Implement CRUD APIs for courses
- [ ] File upload functionality (AWS S3)
- [ ] Course listing and search
- [ ] Course detail page
- [ ] Instructor dashboard
- [ ] Course creation wizard
- [ ] Module and lesson management
- [ ] Course enrollment system

### Phase 4: Student Dashboard & Progress Tracking (Week 5)
- [ ] Create Enrollment model
- [ ] Student dashboard UI
- [ ] Enrolled courses display
- [ ] Progress tracking implementation
- [ ] Course player (video/document viewer)
- [ ] Mark lessons as complete
- [ ] Progress analytics

### Phase 5: Quizzes and Assignments (Week 6-7)
- [ ] Create Quiz and Assignment models
- [ ] Quiz creation interface for instructors
- [ ] Quiz-taking interface for students
- [ ] Automatic grading system
- [ ] Assignment creation and submission
- [ ] Manual grading interface
- [ ] Grade book implementation
- [ ] Results and feedback display

### Phase 6: Real-time Chat/Forum (Week 8)
- [ ] Set up Socket.io server
- [ ] Create chat UI components
- [ ] Implement real-time messaging
- [ ] Discussion forums per course
- [ ] Message history storage
- [ ] Online user indicators
- [ ] Typing indicators

### Phase 7: Admin Panel (Week 9)
- [ ] Admin dashboard UI
- [ ] User management CRUD
- [ ] Course approval workflow
- [ ] Content moderation tools
- [ ] Platform analytics
- [ ] System settings

### Phase 8: Notifications and Alerts (Week 10)
- [ ] Create Notification model
- [ ] Email service integration (SendGrid/Nodemailer)
- [ ] In-app notification system
- [ ] Real-time notification delivery
- [ ] Notification preferences
- [ ] Email templates

### Phase 9: Testing and Quality Assurance (Week 11-12)
- [ ] Write unit tests for API endpoints
- [ ] Write integration tests
- [ ] Test React components
- [ ] End-to-end testing with Cypress
- [ ] Performance testing
- [ ] Security audit
- [ ] Bug fixes and optimization

### Phase 10: Deployment (Week 13)
- [ ] Set up MongoDB Atlas
- [ ] Configure AWS S3 for file storage
- [ ] Deploy backend to AWS EC2/Render
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Set up CI/CD pipeline
- [ ] Configure domain and SSL
- [ ] Monitoring and logging setup

---

## 💡 4. Tech Stack Recommendations

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.14.0",
  "tailwindcss": "^3.3.0",
  "axios": "^1.4.0",
  "@tanstack/react-query": "^4.29.0",
  "socket.io-client": "^4.6.0",
  "react-hook-form": "^7.45.0",
  "yup": "^1.2.0",
  "react-toastify": "^9.1.3",
  "lucide-react": "^0.263.0",
  "recharts": "^2.7.0"
}
```

### Backend
```json
{
  "express": "^4.18.0",
  "mongoose": "^7.3.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.0",
  "cors": "^2.8.5",
  "helmet": "^7.0.0",
  "express-rate-limit": "^6.8.0",
  "express-validator": "^7.0.0",
  "morgan": "^1.10.0",
  "nodemailer": "^6.9.0",
  "socket.io": "^4.6.0",
  "multer": "^1.4.5-lts.1",
  "aws-sdk": "^2.1400.0",
  "redis": "^4.6.0"
}
```

### Testing
```json
{
  "jest": "^29.5.0",
  "supertest": "^6.3.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^5.16.0",
  "cypress": "^12.17.0"
}
```

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Nodemon**: Auto-restart server
- **Concurrently**: Run multiple commands

---

## 🗂️ 5. Folder Structure

```
edutrack/
├── client/                      # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   └── assets/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   ├── course/
│   │   │   │   ├── CourseCard.jsx
│   │   │   │   ├── CourseList.jsx
│   │   │   │   └── CoursePlayer.jsx
│   │   │   ├── quiz/
│   │   │   │   ├── QuizCard.jsx
│   │   │   │   └── QuestionItem.jsx
│   │   │   └── layout/
│   │   │       ├── Header.jsx
│   │   │       ├── Sidebar.jsx
│   │   │       └── Footer.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── student/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Courses.jsx
│   │   │   │   ├── CourseDetail.jsx
│   │   │   │   └── Progress.jsx
│   │   │   ├── instructor/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── CreateCourse.jsx
│   │   │   │   ├── ManageCourses.jsx
│   │   │   │   └── Grades.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Users.jsx
│   │   │       ├── Courses.jsx
│   │   │       └── Analytics.jsx
│   │   ├── context/             # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CourseContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   ├── hooks/               # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useCourse.js
│   │   │   └── useSocket.js
│   │   ├── utils/               # Utility functions
│   │   │   ├── api.js           # Axios setup
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   └── index.css        # Tailwind imports
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env
│
├── server/                      # Backend Node.js application
│   ├── src/
│   │   ├── controllers/         # Business logic
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── courseController.js
│   │   │   ├── quizController.js
│   │   │   ├── assignmentController.js
│   │   │   └── notificationController.js
│   │   ├── models/              # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Enrollment.js
│   │   │   ├── Quiz.js
│   │   │   ├── QuizAttempt.js
│   │   │   ├── Assignment.js
│   │   │   ├── Submission.js
│   │   │   └── Notification.js
│   │   ├── routes/              # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── courseRoutes.js
│   │   │   ├── quizRoutes.js
│   │   │   ├── assignmentRoutes.js
│   │   │   └── notificationRoutes.js
│   │   ├── middleware/          # Custom middleware
│   │   │   ├── auth.js          # JWT verification
│   │   │   ├── roleCheck.js     # RBAC
│   │   │   ├── errorHandler.js
│   │   │   ├── validator.js
│   │   │   └── upload.js        # File upload
│   │   ├── config/              # Configuration files
│   │   │   ├── database.js
│   │   │   ├── jwt.js
│   │   │   ├── email.js
│   │   │   └── aws.js
│   │   ├── utils/               # Utility functions
│   │   │   ├── generateToken.js
│   │   │   ├── sendEmail.js
│   │   │   └── uploadToS3.js
│   │   ├── validators/          # Input validation schemas
│   │   │   ├── authValidator.js
│   │   │   ├── courseValidator.js
│   │   │   └── quizValidator.js
│   │   ├── socket/              # Socket.io handlers
│   │   │   └── socketHandler.js
│   │   ├── app.js               # Express app setup
│   │   └── server.js            # Server entry point
│   ├── tests/                   # Test files
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── package.json
│   └── .env
│
├── .gitignore
├── README.md
├── ARCHITECTURE.md              # This file
└── package.json                 # Root package.json for scripts
```

---

_Continue reading: [TESTING.md](./TESTING.md) | [DEPLOYMENT.md](./DEPLOYMENT.md) | [SECURITY.md](./SECURITY.md)_
