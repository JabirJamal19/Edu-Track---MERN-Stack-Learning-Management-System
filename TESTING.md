# 🧪 Testing Strategy - EduTrack LMS

## Overview
Comprehensive testing strategy to ensure code quality, reliability, and performance of the EduTrack platform.

---

## Testing Pyramid

```
                    /\
                   /  \
                  / E2E \           (10%) - End-to-End Tests
                 /______\
                /        \
               /Integration\        (30%) - Integration Tests
              /____________\
             /              \
            /  Unit Tests    \      (60%) - Unit Tests
           /__________________\
```

---

## 1. Unit Testing

### Backend Unit Tests (Jest + Supertest)

#### Controllers Testing
```javascript
// tests/unit/controllers/authController.test.js
describe('Auth Controller', () => {
  test('should register a new user', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'student'
    };
    
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(userData);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe(userData.email);
  });

  test('should not register user with existing email', async () => {
    // Test duplicate email validation
  });

  test('should login with valid credentials', async () => {
    // Test login functionality
  });

  test('should not login with invalid credentials', async () => {
    // Test invalid login
  });
});
```

#### Models Testing
```javascript
// tests/unit/models/User.test.js
describe('User Model', () => {
  test('should hash password before saving', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'plaintext'
    });
    
    await user.save();
    expect(user.password).not.toBe('plaintext');
  });

  test('should validate email format', async () => {
    const user = new User({ email: 'invalid-email' });
    await expect(user.validate()).rejects.toThrow();
  });
});
```

#### Middleware Testing
```javascript
// tests/unit/middleware/auth.test.js
describe('Auth Middleware', () => {
  test('should authenticate valid token', () => {
    // Test JWT verification
  });

  test('should reject invalid token', () => {
    // Test invalid token rejection
  });

  test('should check role permissions', () => {
    // Test role-based access
  });
});
```

### Frontend Unit Tests (Jest + React Testing Library)

#### Component Testing
```javascript
// src/components/__tests__/CourseCard.test.jsx
import { render, screen } from '@testing-library/react';
import CourseCard from '../course/CourseCard';

describe('CourseCard Component', () => {
  const mockCourse = {
    title: 'React Fundamentals',
    description: 'Learn React basics',
    instructor: 'John Doe',
    price: 49.99
  };

  test('renders course information correctly', () => {
    render(<CourseCard course={mockCourse} />);
    
    expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });

  test('handles enroll button click', () => {
    const mockEnroll = jest.fn();
    render(<CourseCard course={mockCourse} onEnroll={mockEnroll} />);
    
    fireEvent.click(screen.getByText('Enroll Now'));
    expect(mockEnroll).toHaveBeenCalledWith(mockCourse.id);
  });
});
```

#### Hook Testing
```javascript
// src/hooks/__tests__/useAuth.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';

describe('useAuth Hook', () => {
  test('should login user', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    expect(result.current.user).toBeDefined();
    expect(result.current.isAuthenticated).toBe(true);
  });

  test('should logout user', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

---

## 2. Integration Testing

### API Integration Tests

```javascript
// tests/integration/course.test.js
describe('Course API Integration', () => {
  let authToken;
  let courseId;

  beforeAll(async () => {
    // Set up test database
    // Create test user and get auth token
  });

  test('should create a course (instructor only)', async () => {
    const courseData = {
      title: 'Test Course',
      description: 'Test Description',
      category: 'Programming'
    };

    const response = await request(app)
      .post('/api/v1/courses')
      .set('Authorization', `Bearer ${authToken}`)
      .send(courseData);

    expect(response.status).toBe(201);
    courseId = response.body._id;
  });

  test('should get all courses', async () => {
    const response = await request(app)
      .get('/api/v1/courses');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.courses)).toBe(true);
  });

  test('should enroll in a course', async () => {
    const response = await request(app)
      .post(`/api/v1/courses/${courseId}/enroll`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    // Clean up test data
  });
});
```

### Frontend-Backend Integration

```javascript
// tests/integration/enrollment.test.js
describe('Course Enrollment Flow', () => {
  test('complete enrollment process', async () => {
    // 1. Login as student
    // 2. Browse courses
    // 3. Select a course
    // 4. Enroll in course
    // 5. Verify enrollment in dashboard
  });
});
```

---

## 3. End-to-End Testing (Cypress)

### E2E Test Scenarios

```javascript
// cypress/e2e/student-journey.cy.js
describe('Student User Journey', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should complete full student workflow', () => {
    // Register
    cy.get('[data-cy=register-link]').click();
    cy.get('[data-cy=first-name]').type('John');
    cy.get('[data-cy=last-name]').type('Doe');
    cy.get('[data-cy=email]').type('student@test.com');
    cy.get('[data-cy=password]').type('Password123!');
    cy.get('[data-cy=register-button]').click();

    // Browse courses
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=browse-courses]').click();

    // Enroll in course
    cy.get('[data-cy=course-card]').first().click();
    cy.get('[data-cy=enroll-button]').click();
    cy.get('[data-cy=success-message]').should('be.visible');

    // Access course content
    cy.get('[data-cy=my-courses]').click();
    cy.get('[data-cy=course-item]').first().click();
    cy.get('[data-cy=lesson-item]').first().click();

    // Take quiz
    cy.get('[data-cy=quiz-tab]').click();
    cy.get('[data-cy=start-quiz]').click();
    // Answer questions
    cy.get('[data-cy=submit-quiz]').click();
    cy.get('[data-cy=quiz-score]').should('be.visible');
  });
});
```

```javascript
// cypress/e2e/instructor-workflow.cy.js
describe('Instructor Workflow', () => {
  it('should create and manage a course', () => {
    // Login as instructor
    cy.login('instructor@test.com', 'password');

    // Create new course
    cy.get('[data-cy=create-course]').click();
    cy.get('[data-cy=course-title]').type('New Course');
    cy.get('[data-cy=course-description]').type('Description');
    
    // Add module
    cy.get('[data-cy=add-module]').click();
    cy.get('[data-cy=module-title]').type('Module 1');

    // Add lesson
    cy.get('[data-cy=add-lesson]').click();
    cy.get('[data-cy=lesson-title]').type('Lesson 1');
    
    // Publish course
    cy.get('[data-cy=publish-course]').click();
    cy.get('[data-cy=success-message]').should('contain', 'Course published');
  });
});
```

---

## 4. Performance Testing

### Load Testing (Artillery)

```yaml
# artillery-config.yml
config:
  target: 'http://localhost:5000'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Sustained load"
    - duration: 60
      arrivalRate: 100
      name: "Spike"

scenarios:
  - name: "Get courses"
    flow:
      - get:
          url: "/api/v1/courses"
  
  - name: "User login and browse"
    flow:
      - post:
          url: "/api/v1/auth/login"
          json:
            email: "test@example.com"
            password: "password"
      - get:
          url: "/api/v1/courses"
```

### Lighthouse Performance Audits
- Run Lighthouse CI in deployment pipeline
- Target scores:
  - Performance: > 90
  - Accessibility: > 95
  - Best Practices: > 90
  - SEO: > 90

---

## 5. Security Testing

### Security Audit Checklist
- [ ] SQL Injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Authentication vulnerabilities
- [ ] Authorization bypass
- [ ] File upload security
- [ ] Rate limiting effectiveness
- [ ] Dependency vulnerabilities (npm audit)

### Tools
- **OWASP ZAP**: Automated security testing
- **npm audit**: Check for vulnerable dependencies
- **Snyk**: Continuous security monitoring

---

## 6. Test Coverage Goals

### Coverage Targets
- **Overall**: > 80%
- **Critical paths**: 100%
- **Controllers**: > 90%
- **Models**: > 85%
- **Components**: > 75%

### Generate Coverage Reports
```bash
# Backend
npm run test:coverage

# Frontend
npm run test -- --coverage
```

---

## 7. Continuous Integration Testing

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd server && npm install
          cd ../client && npm install
      
      - name: Run backend tests
        run: cd server && npm test
      
      - name: Run frontend tests
        run: cd client && npm test
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## 8. Testing Best Practices

### General Guidelines
1. **Write tests first** (TDD when possible)
2. **Keep tests independent** - No test dependencies
3. **Use descriptive names** - Clear test intentions
4. **Follow AAA pattern** - Arrange, Act, Assert
5. **Mock external dependencies** - Database, APIs, etc.
6. **Clean up after tests** - Reset state, clear database
7. **Run tests in CI/CD** - Automated testing
8. **Maintain test data** - Use factories/fixtures

### Test Naming Convention
```
describe('[Component/Function Name]', () => {
  test('should [expected behavior] when [condition]', () => {
    // Test implementation
  });
});
```

---

## 9. Test Data Management

### Test Fixtures
```javascript
// tests/fixtures/users.js
export const testUsers = {
  student: {
    email: 'student@test.com',
    password: 'password123',
    role: 'student'
  },
  instructor: {
    email: 'instructor@test.com',
    password: 'password123',
    role: 'instructor'
  },
  admin: {
    email: 'admin@test.com',
    password: 'password123',
    role: 'admin'
  }
};
```

### Database Seeding
```javascript
// tests/setup/seedDatabase.js
const seedDatabase = async () => {
  await User.deleteMany({});
  await Course.deleteMany({});
  
  // Create test users
  // Create test courses
  // Create test enrollments
};
```

---

## 10. Monitoring and Reporting

### Test Reports
- Generate HTML reports for test results
- Track test execution time
- Monitor flaky tests
- Code coverage reports

### Tools
- **Jest HTML Reporter**: Visual test reports
- **Allure**: Advanced test reporting
- **SonarQube**: Code quality and coverage

---

_Related: [ARCHITECTURE.md](./ARCHITECTURE.md) | [DEPLOYMENT.md](./DEPLOYMENT.md) | [SECURITY.md](./SECURITY.md)_
