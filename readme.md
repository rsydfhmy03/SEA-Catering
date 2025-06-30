# SEA Catering - Healthy Meals Delivery Platform

## Overview
SEA Catering is a comprehensive platform that revolutionizes healthy eating in Indonesia by providing customizable meal plans delivered. This project implements a full-stack solution with:

- **Frontend**: Modern React application with responsive UI
- **Backend**: AdonisJS API server with PostgreSQL database
- **Infrastructure**: Deployed on Google Cloud App Engine with Supabase PostgreSQL

![SEA Catering Screenshot](https://storage.googleapis.com/gansdoctor_skripsi/sea-catering/SEAHOMEPAGE.JPG)

- *Link Deployment FrontEnd* : 
https://sea-catering-frontend-dot-gansdoctor.as.r.appspot.com/

- *Link Deployment BackEnd* : 
https://seacatering-api-service-dot-gansdoctor.as.r.appspot.com/api/v1

## Table of Contents
1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Running the Application](#running-the-application)
7. [Deployment](#deployment)
8. [Admin Account Setup](#admin-account-setup)
9. [Technical Implementation](#technical-implementation)
10. [API Documentation](#api-documentation)
11. [Troubleshooting](#troubleshooting)

## Project Structure
```
SEA-Catering/
├── Backend/                # AdonisJS API server
│   └── sea-catering-api/
├── Frontend/               # React application
│   └── sea-catering-frontend/
```

## Prerequisites
Before getting started, ensure you have these installed:

- Node.js v18 or higher
- npm v9 or higher
- PostgreSQL v14 or higher
- Git

## Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/rsydfhmy03/SEA-Catering.git
cd SEA-Catering
```

### 2. Install backend dependencies
```bash
cd Backend/sea-catering-api
npm install
```

### 3. Install frontend dependencies
```bash
cd ../../Frontend/sea-catering-frontend
npm install
```

## Environment Configuration

### Backend (.env)
Create `.env` file in `Backend/sea-catering-api`:

```env
NODE_ENV=development
PORT=3333
APP_KEY= # Generate with: node ace generate:key
LOG_LEVEL=info

# Database Configuration (Supabase example)
DB_HOST=aws-0-ap-southeast-1.pooler.supabase.com
DB_PORT=6543
DB_USER=your_supabase_user
DB_PASSWORD=your_supabase_password
DB_DATABASE=your_supabase_db

SESSION_DRIVER=cookie

# JWT Configuration
JWT_SECRET= # Generate with: node ace generate:key
JWT_EXPIRES_IN=7d
```

### Frontend (.env)
Create `.env` file in `Frontend/sea-catering-frontend`:

```env
VITE_API_BASE_URL=http://localhost:3333/api/v1
```

## Database Setup

### 1. Create PostgreSQL database
Create a new PostgreSQL database either locally or using Supabase.

### 2. Run migrations
```bash
cd Backend/sea-catering-api
node ace migration:run
```

### 3. Run seeders
```bash
node ace db:seed
```

## Running the Application

### Start backend server
```bash
cd Backend/sea-catering-api
npm run dev
```
Server will run at: http://localhost:3333

### Start frontend application
```bash
cd Frontend/sea-catering-frontend
npm run dev
```
Application will run at: http://localhost:5173

## Deployment

### Google Cloud App Engine Deployment

1. **Install Google Cloud SDK**: Follow [official instructions](https://cloud.google.com/sdk/docs/install)

2. **Initialize project**:
```bash
gcloud init
```

3. **Backend Deployment**:
```bash
cd Backend/sea-catering-api

# Create app.yaml
echo "runtime: nodejs20
service: backend
env_variables:
  NODE_ENV: production
  PORT: 8080
  APP_KEY: your_production_key
  DB_HOST: your_production_db_host
  DB_PORT: your_production_db_port
  DB_USER: your_production_db_user
  DB_PASSWORD: your_production_db_password
  DB_DATABASE: your_production_db_name
  JWT_SECRET: your_production_jwt_secret" > app.yaml

# Deploy
gcloud app deploy
```

4. **Frontend Deployment**:
```bash
cd Frontend/sea-catering-frontend

# Create app.yaml
echo "runtime: nodejs20
service: frontend
env_variables:
  VITE_API_BASE_URL: https://your-backend-service-dot-your-project.uc.r.appspot.com/api/v1" > app.yaml

# Build and deploy
npm run build
gcloud app deploy
```

### Supabase Database Configuration
Use Supabase for production PostgreSQL database:
1. Create project at https://supabase.com
2. Get connection details from Settings > Database
3. Update backend environment variables with Supabase credentials

## Admin Account Setup
The admin account is created automatically through database seeding. To access:

1. Run the seeder:
```bash
cd Backend/sea-catering-api
node ace db:seed --files AdminUserSeeder.ts
```

2. Login credentials:
- **Email**: admin@seacatering.com
- **Password**: Admin123!

## Technical Implementation

### Technical Task Completion
The implementation covers all required levels:

1. **Level 1: Welcome to SEA Catering!**  

2. **Level 2: Making It Interactive**  

3. **Level 3: Building a Subscription System**  

4. **Level 4: Securing SEA**  

5. **Level 5: User & Admin Dashboard**  

### Technology Stack
**Frontend**:
- React v19
- Redux Toolkit for state management
- Tailwind CSS for styling
- Vite for build tooling
- React Router v7 for navigation
- Lucide React for icons

**Backend**:
- AdonisJS v6
- PostgreSQL database
- JWT authentication
- VineJS for validation
- Lucid ORM

**Infrastructure**:
- Google Cloud App Engine
- Supabase PostgreSQL

### Key Dependencies
**Backend** (package.json):
```json
"dependencies": {
    "@adonisjs/auth": "^9.4.0",
    "@adonisjs/core": "^6.18.0",
    "@adonisjs/cors": "^2.2.1",
    "@adonisjs/limiter": "^2.4.0",
    "@adonisjs/lucid": "^21.6.1",
    "@adonisjs/session": "^7.5.1",
    "@vinejs/vine": "^3.0.1",
    "bcryptjs": "^3.0.2",
    "jsonwebtoken": "^9.0.2",
    "luxon": "^3.6.1",
    "pg": "^8.16.2",
    "reflect-metadata": "^0.2.2"
}
```

**Frontend** (package.json):
```json
"dependencies": {
    "@reduxjs/toolkit": "^2.8.2",
    "@tanstack/react-table": "^8.21.3",
    "axios": "^1.10.0",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.523.0",
    "react": "^19.1.0",
    "react-datepicker": "^8.4.0",
    "react-dom": "^19.1.0",
    "react-hot-toast": "^2.5.2",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.6.2"
}
```

## Troubleshooting

### Common Issues
1. **Migration errors**:
   - Ensure PostgreSQL is running
   - Verify database credentials in .env file
   - Run `node ace migration:rollback` before retrying

2. **Authentication issues**:
   - Verify JWT_SECRET is set in backend .env
   - Check token expiration time

3. **CORS errors**:
   - Configure CORS in `config/cors.ts`
   - Ensure frontend URL is in allowed origins

4. **Database connection issues with Supabase**:
   - Whitelist your IP in Supabase network settings
   - Verify connection string parameters

### Getting Help
For additional support, contact: fahmyrosyadi29@gmail.com

---

**Developed by Fahmy Rosyadi (@mitahudev.03)**  