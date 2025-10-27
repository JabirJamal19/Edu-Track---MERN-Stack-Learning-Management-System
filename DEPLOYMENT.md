# 🚀 Deployment Guide - EduTrack LMS

## Overview
Comprehensive deployment strategy for the EduTrack Learning Management System with focus on scalability, reliability, and performance.

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CloudFlare                          │
│                    (CDN + DDoS)                         │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐       ┌───────▼────────┐
│  Frontend CDN  │       │   API Gateway  │
│ (Vercel/Netlify│       │  (Load Balancer│
└────────────────┘       └───────┬────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
            ┌───────▼────────┐       ┌───────▼────────┐
            │  Backend API   │       │  Backend API   │
            │   (Instance 1) │       │   (Instance 2) │
            └───────┬────────┘       └───────┬────────┘
                    │                         │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │                         │
            ┌───────▼────────┐       ┌───────▼────────┐
            │  MongoDB Atlas │       │    Redis       │
            │   (Database)   │       │    (Cache)     │
            └────────────────┘       └────────────────┘
                                              │
                                     ┌────────▼────────┐
                                     │     AWS S3      │
                                     │  (File Storage) │
                                     └─────────────────┘
```

---

## 1. Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

#### Build Optimization
```javascript
// vite.config.js (if using Vite)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

#### Environment Variables
```env
# .env.production
VITE_API_URL=https://api.edutrack.com
VITE_SOCKET_URL=wss://api.edutrack.com
VITE_APP_NAME=EduTrack
```

### Step 2: Deploy to Vercel

#### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd client
vercel --prod
```

#### Option 2: GitHub Integration
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist` or `build`
   - **Install Command**: `npm install`
4. Add environment variables in Vercel dashboard
5. Deploy automatically on push

### Step 3: Custom Domain Setup
```bash
# Add custom domain
vercel domains add www.edutrack.com
vercel domains add edutrack.com

# Configure DNS (in your domain registrar):
# A Record: @ -> Vercel IP
# CNAME: www -> cname.vercel-dns.com
```

---

## 2. Backend Deployment (AWS EC2 / Render)

### Option A: AWS EC2 Deployment

#### Step 1: Launch EC2 Instance
```bash
# Instance specifications:
# - Type: t3.medium (or larger for production)
# - OS: Ubuntu 22.04 LTS
# - Security Group:
#   - Port 22 (SSH)
#   - Port 80 (HTTP)
#   - Port 443 (HTTPS)
#   - Port 5000 (Node.js)
```

#### Step 2: Server Setup
```bash
# Connect to EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

#### Step 3: Deploy Application
```bash
# Clone repository
git clone https://github.com/your-repo/edutrack.git
cd edutrack/server

# Install dependencies
npm install --production

# Set up environment variables
nano .env
# Add production environment variables

# Start application with PM2
pm2 start src/server.js --name edutrack-api
pm2 startup systemd
pm2 save
```

#### Step 4: Configure Nginx
```nginx
# /etc/nginx/sites-available/edutrack
server {
    listen 80;
    server_name api.edutrack.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support
    location /socket.io/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/edutrack /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Set up SSL with Let's Encrypt
sudo certbot --nginx -d api.edutrack.com
```

### Option B: Render Deployment

#### Step 1: Create render.yaml
```yaml
# render.yaml
services:
  - type: web
    name: edutrack-api
    env: node
    region: oregon
    plan: standard
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: AWS_ACCESS_KEY_ID
        sync: false
      - key: AWS_SECRET_ACCESS_KEY
        sync: false
    healthCheckPath: /api/v1/health
```

#### Step 2: Deploy via Dashboard
1. Connect GitHub repository
2. Select render.yaml configuration
3. Add environment variables
4. Deploy

---

## 3. Database Deployment (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster

```bash
# Cluster Configuration:
# - Provider: AWS
# - Region: Same as backend (us-east-1)
# - Tier: M10 (Production) or higher
# - Backup: Enabled
```

### Step 2: Configure Security

#### Network Access
```
# Add IP Whitelist:
# - Development: Your IP
# - Production: Backend server IPs or 0.0.0.0/0 (with strong password)
```

#### Database User
```
# Create database user:
# Username: edutrack_app
# Password: [Strong generated password]
# Role: readWrite on edutrack database
```

### Step 3: Connection String
```env
# Production .env
MONGODB_URI=mongodb+srv://edutrack_app:password@cluster.mongodb.net/edutrack?retryWrites=true&w=majority
```

### Step 4: Database Indexing
```javascript
// Run in production after deployment
db.users.createIndex({ email: 1 }, { unique: true });
db.courses.createIndex({ title: "text", description: "text" });
db.courses.createIndex({ instructor: 1, status: 1 });
db.enrollments.createIndex({ student: 1, course: 1 }, { unique: true });
db.notifications.createIndex({ recipient: 1, read: 1, createdAt: -1 });
```

---

## 4. File Storage (AWS S3)

### Step 1: Create S3 Bucket
```bash
# Bucket name: edutrack-uploads
# Region: us-east-1
# Block public access: Off (configure per-object permissions)
```

### Step 2: Configure CORS
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://edutrack.com", "https://www.edutrack.com"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### Step 3: IAM User for Application
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::edutrack-uploads/*"
    }
  ]
}
```

### Step 4: Environment Variables
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=edutrack-uploads
```

---

## 5. Redis Cache (Redis Cloud)

### Step 1: Create Redis Instance
```
# Provider: Redis Cloud / AWS ElastiCache
# Plan: 30MB (free tier) or larger
# Region: Same as backend
```

### Step 2: Connection
```env
REDIS_URL=redis://username:password@host:port
```

### Step 3: Implementation
```javascript
// server/src/config/redis.js
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache course list
const cacheKey = 'courses:all';
const cachedCourses = await redis.get(cacheKey);

if (cachedCourses) {
  return JSON.parse(cachedCourses);
}

const courses = await Course.find();
await redis.setex(cacheKey, 3600, JSON.stringify(courses)); // Cache for 1 hour
```

---

## 6. CI/CD Pipeline (GitHub Actions)

### Complete CI/CD Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy EduTrack

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

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
          cd server && npm ci
          cd ../client && npm ci
      
      - name: Run tests
        run: |
          cd server && npm test
          cd ../client && npm test
      
      - name: Run linter
        run: |
          cd server && npm run lint
          cd ../client && npm run lint

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./client
```

---

## 7. Environment Variables Management

### Development (.env.development)
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

MONGODB_URI=mongodb://localhost:27017/edutrack
REDIS_URL=redis://localhost:6379

JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=7d

AWS_ACCESS_KEY_ID=your_dev_key
AWS_SECRET_ACCESS_KEY=your_dev_secret
AWS_REGION=us-east-1
AWS_BUCKET_NAME=edutrack-dev

EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_pass
```

### Production (.env.production)
```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://www.edutrack.com

MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/edutrack
REDIS_URL=redis://username:password@host:port

JWT_SECRET=[strong-random-secret-256-bits]
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=[another-strong-secret]

AWS_ACCESS_KEY_ID=[production-key]
AWS_SECRET_ACCESS_KEY=[production-secret]
AWS_REGION=us-east-1
AWS_BUCKET_NAME=edutrack-uploads

EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=[sendgrid-api-key]
EMAIL_FROM=noreply@edutrack.com
```

---

## 8. Monitoring & Logging

### Application Monitoring (PM2)

```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs edutrack-api

# Check status
pm2 status
```

### Error Tracking (Sentry)

```javascript
// server/src/app.js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// Error handler
app.use(Sentry.Handlers.errorHandler());
```

### Performance Monitoring (New Relic / Datadog)

```javascript
// server/src/server.js
require('newrelic');
```

### Log Management (Winston)

```javascript
// server/src/utils/logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
```

---

## 9. Scalability Configuration

### Load Balancing (AWS ELB)

```
# Application Load Balancer
# - Target Group: Backend instances
# - Health Check: /api/v1/health
# - Sticky Sessions: Enabled (for Socket.io)
```

### Auto Scaling

```yaml
# Auto Scaling Group Configuration
MinSize: 2
MaxSize: 10
DesiredCapacity: 2

ScalingPolicies:
  - CPU > 70%: Add 2 instances
  - CPU < 30%: Remove 1 instance
```

### Database Sharding (Future)

```javascript
// Horizontal partitioning strategy
// Shard by user_id or course_id
```

---

## 10. Backup & Disaster Recovery

### MongoDB Backup

```bash
# Automated backups in MongoDB Atlas
# - Continuous backup enabled
# - Retention: 7 days
# - Manual snapshot before major changes
```

### S3 Versioning

```bash
# Enable versioning on S3 bucket
aws s3api put-bucket-versioning \
  --bucket edutrack-uploads \
  --versioning-configuration Status=Enabled
```

### Database Restore Procedure

```bash
# 1. Stop application
pm2 stop edutrack-api

# 2. Restore from Atlas snapshot
# (Via Atlas dashboard)

# 3. Verify data integrity
# Run validation scripts

# 4. Restart application
pm2 restart edutrack-api
```

---

## 11. Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] SSL certificates valid
- [ ] Backup taken

### Deployment
- [ ] Build frontend successfully
- [ ] Deploy frontend to CDN
- [ ] Deploy backend to servers
- [ ] Update environment variables
- [ ] Run database migrations
- [ ] Clear caches

### Post-Deployment
- [ ] Health check endpoints responding
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify critical user flows
- [ ] Monitor logs for errors
- [ ] Update documentation

---

## 12. Rollback Strategy

```bash
# Quick rollback procedure

# 1. Frontend (Vercel)
vercel rollback

# 2. Backend (PM2)
cd edutrack/server
git checkout previous-stable-tag
npm install
pm2 restart edutrack-api

# 3. Database
# Restore from latest snapshot if needed
```

---

_Related: [ARCHITECTURE.md](./ARCHITECTURE.md) | [TESTING.md](./TESTING.md) | [SECURITY.md](./SECURITY.md)_
