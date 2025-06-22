# Healthcare Backend API

A comprehensive healthcare management system built with Node.js, Express.js, and PostgreSQL. This RESTful API provides secure user authentication and complete CRUD operations for managing patients, doctors, and their relationships.

## 🚀 Live Demo

**API is deployed and live on Vercel:** [https://your-healthcare-api.vercel.app](https://your-healthcare-api.vercel.app)

- **Health Check:** [https://your-healthcare-api.vercel.app/health](https://your-healthcare-api.vercel.app/health)
- **Base URL:** `https://your-healthcare-api.vercel.app/api`

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Password Hashing**: bcryptjs
- **Environment**: dotenv
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/nihalp19/backendproject/
cd healthcare-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env

PORT = 8080
DATABASE_URL=postgres://db_type:password@localhost:5432/db_name
JWT_SECRET=jwt_secret



```

### 5. Run the application
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:8080`

## 📚 API Documentation

### Base URL
- **Local**: `http://localhost:8080/api`
- **Production**: `https://your-healthcare-api.vercel.app/api`


