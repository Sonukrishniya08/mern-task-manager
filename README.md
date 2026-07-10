# 📝 MERN Task Manager

A modern and responsive Task Management application built using the MERN Stack. The application allows users to securely manage their daily tasks with authentication, filtering, sorting, and a clean user interface.

## 📖 Project Overview

The MERN Task Manager is a full-stack web application that enables authenticated users to create, update, delete, and organize their personal tasks efficiently.

The project focuses on clean architecture, secure authentication, reusable components, professional UI, and RESTful API design.

Each user can access only their own tasks using JWT authentication.

## ✨ Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Automatic Logout on Invalid Token

### Task Management

- Create Task
- Update Task
- Delete Task
- View All Tasks

### Task Organization

- Filter by Status
- Filter by Priority
- Sort by Due Date
- Color-coded Status
- Color-coded Priority

### UI Features

- Responsive Design
- Toast Notifications
- Delete Confirmation Modal
- Loading Spinner
- Modern Dashboard
- Professional Task Cards

### Backend

- REST API
- MongoDB Database
- Global Error Handling
- Query Parameters
- Environment Variables

## 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- React Toastify
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Development Tools

- Git
- GitHub
- VS Code

## 📁 Project Structure

client/
│
├── src/
│ ├── api/
│ ├── services/
│ ├── components/
│ ├── context/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
│
server/
│
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── app.js
└── server.js

## 🚀 Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Backend

```bash
cd server
npm install
```

### Install Frontend

```bash
cd client
npm install
```

### Start Backend

```bash
npm run dev
```

### Start Frontend

```bash
npm run dev
```

## 🔑 Environment Variables

Backend (.env)

```env
PORT=

MONGO_URI=

JWT_SECRET=
```

Frontend (.env)

```env
VITE_API_URL=
```

## 📡 API Endpoints

### Authentication

POST /api/auth/register

```json
{
"email":"",
"password":""
}
```

POST /api/auth/login

```json
{
"email":"",
"password":""
}
```

---

### Tasks

GET

```
/api/tasks
```

GET

```
/api/tasks/:id
```

POST

```
/api/tasks
```

PUT

```
/api/tasks/:id
```

DELETE

```
/api/tasks/:id
```

## 🔒 Authentication

The application uses JWT Authentication.

After successful login:

- JWT Token is generated
- Token is stored in Local Storage
- Every API request automatically includes the Authorization header using Axios Interceptors.

Example:

Authorization

Bearer <token>

## 🚀 Future Improvements

- Task Categories
- Drag & Drop
- Email Notifications
- Mobile App

## 👨‍💻 Author

Developed as part of MERN Stack Internship.

Built using React, Node.js, Express.js and MongoDB.



