
# 🏥 Hospital Image Management System - Backend (Node.js)

This repository contains the backend server for the Hospital Image Management System (IMS), built using Node.js and Express.js. It provides RESTful APIs to support a Flutter-based frontend application for managing healthcare-related image workflows and patient data.

---

## 📌 Project Overview

The backend is designed to support a distributed, service-oriented cloud architecture that:

- Manages patient and staff accounts
- Handles image classification and storage metadata
- Generates and stores diagnostic reports
- Tracks cost per patient and produces detailed billing reports
- Ensures data privacy and secure access to sensitive health information

---

## 🔧 Features

- 🧑‍⚕️ User management (patients, doctors, radiologists)
- 📁 Image workflow handling (MRI, CT, X-ray)
- 📋 Diagnostic reporting and timestamps
- 💳 Billing system and cost tracking
- 🔒 Secure authentication with JWT

---

## 📂 Folder Structure

```
HospitalSystem/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── .env
├── server.js
└── README.md
```

---

## 🧑‍💻 Technologies Used

- **Node.js**: Runtime for server-side JavaScript
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for storing users and reports
- **Mongoose**: ODM for MongoDB
- **JWT**: For authentication
- **Cloudinary / Multer (Optional)**: For image metadata handling

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/HospitalSystem.git
   cd HospitalSystem
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root with the following variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/hospital_db
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Server**
   ```bash
   npm start
   ```

---

## 🌐 API Overview

| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------|
| POST   | `/api/auth/register`  | Register a new user              |
| POST   | `/api/auth/login`     | Authenticate user and return JWT |
| GET    | `/api/patients/`      | List all patients                |
| POST   | `/api/patients/`      | Create new patient               |
| GET    | `/api/images/`        | List all images metadata         |
| POST   | `/api/reports/`       | Submit diagnostic report         |

> Full API documentation available in the `/docs` folder (if included).

---

## 🛡 Security

- Passwords hashed using bcrypt
- JWT-based user authentication
- Role-based access control
- Secure CORS setup for frontend communication

---
