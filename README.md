# Ethara Seat Management System

A full-stack Seat Management System built with **FastAPI**, **PostgreSQL**, and **Next.js**. The application helps administrators manage employees, projects, seats, and seat allocations through a secure dashboard with AI-assisted querying.

---

## 🚀 Features

### Authentication
- JWT-based Login
- Secure Password Hashing
- Protected Routes

### Employee Management
- Add Employee
- Edit Employee
- Delete Employee
- View Employee List
- Search Employees
- Pagination

### Project Management
- Add Project
- Edit Project
- Delete Project
- Search Projects

### Seat Management
- Add Seat
- Edit Seat
- Delete Seat
- Seat Status (Available / Occupied)

### Seat Allocation
- Allocate Seat to Employee
- Release Seat
- Allocation History
- Prevent Duplicate Allocations

### Dashboard
- Total Employees
- Total Projects
- Total Seats
- Available Seats
- Occupied Seats
- Recent Employees
- Recent Allocations
- Department Statistics
- Seat Occupancy Chart

### AI Assistant
Supports natural language queries such as:
- Show available seats
- Show occupied seats
- Find employee by name
- Show employees by department
- Show project details

---

# 🛠 Tech Stack

## Frontend
- Next.js
- React
- Axios
- Tailwind CSS
- React Hot Toast
- Recharts

## Backend
- FastAPI
- SQLAlchemy
- JWT Authentication
- Passlib
- Pydantic

## Database
- PostgreSQL

---

# 📁 Project Structure

```
Ethara_Project/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── database/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Backend Setup

## Clone Repository

```bash
git clone https://github.com/your-username/ethara-assessment.git
cd ethara-assessment
```

## Backend

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install Packages

```bash
pip install -r requirements.txt
```

Create `.env`

```env
DATABASE_URL=postgresql://username:password@localhost:5432/ethara
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

# 💻 Frontend Setup

```bash
cd frontend
```

Install Packages

```bash
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Run Frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:3000
```

---

# 🗄 Database

PostgreSQL

Create database

```
ethara
```

Run migrations or initialize your tables before using the application.

---

# 🔐 Authentication

Login API

```
POST /auth/login
```

Register API

```
POST /auth/register
```

JWT Token is stored on successful login and used for protected API requests.

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /auth/register |
| POST | /auth/login |

## Employees

| Method | Endpoint |
|---------|----------|
| GET | /employees |
| POST | /employees |
| PUT | /employees/{id} |
| DELETE | /employees/{id} |

## Projects

| Method | Endpoint |
|---------|----------|
| GET | /projects |
| POST | /projects |
| PUT | /projects/{id} |
| DELETE | /projects/{id} |

## Seats

| Method | Endpoint |
|---------|----------|
| GET | /seats |
| POST | /seats |
| PUT | /seats/{id} |
| DELETE | /seats/{id} |

## Allocation

| Method | Endpoint |
|---------|----------|
| GET | /allocation |
| POST | /allocation |
| POST | /allocation/release/{id} |

## AI

| Method | Endpoint |
|---------|----------|
| POST | /ai/query |

---

# 🚀 Deployment

## Backend

Railway

## Frontend

Railway

## Database

Railway PostgreSQL

---

# 📷 Screenshots

Add screenshots here after deployment.

Example:

```
screenshots/

login.png

dashboard.png

employees.png

projects.png

seats.png

allocation.png

ai.png
```

---

# 👨‍💻 Author

**Mohd Daniyal**

- GitHub: https://github.com/Daniya1-khan

---

# 📄 License

This project was developed as part of the Ethara Technical Assessment for educational and evaluation purposes.
