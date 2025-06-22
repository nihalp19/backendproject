# Healthcare Backend API

A comprehensive healthcare management system built with Node.js, Express.js, and PostgreSQL. This RESTful API provides secure user authentication and complete CRUD operations for managing patients, doctors, and their relationships.

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


