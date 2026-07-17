# AI_PROMPTS.md

# AI Prompt Documentation

## Project

**Ethara Seat Management System**

---

# Overview

The AI Assistant helps administrators retrieve seat management information using simple natural language queries. It allows users to quickly search employees, projects, seats, and seat allocations without manually navigating the application.

---

# AI Features

The assistant supports the following tasks:

- View available seats
- View occupied seats
- Search employees
- View employee seat allocation
- Search projects
- Display seat allocation details

---

# Supported Prompts

## Seat Queries

- Show available seats
- Show occupied seats
- How many seats are available?
- List all available seats

### Example

**Prompt**

```
Show available seats
```

**Response**

```
Available Seats

A101
A102
A105
B201
B203
```

---

## Employee Queries

- Show all employees
- Find employee John
- Employees in HR
- Employees in IT

### Example

**Prompt**

```
Find employee John
```

**Response**

```
Employee Name : John Doe

Department : IT

Project : AI Platform

Allocated Seat : A105
```

---

## Project Queries

- Show all projects
- Find project AI Platform
- List active projects

### Example

**Prompt**

```
Show all projects
```

**Response**

```
Projects

Ethara AI
Smart Office
Employee Portal
Seat Management
```

---

## Seat Allocation Queries

- Show seat allocation
- Show allocated employees
- Show released seats
- Which seat is assigned to John?

### Example

**Prompt**

```
Which seat is assigned to John?
```

**Response**

```
Employee : John Doe

Seat : A105

Project : AI Platform
```

---

# API Endpoint

```
POST /ai/query
```

---

# Request

```json
{
  "query": "Show available seats"
}
```

---

# Response

```json
{
  "answer": "There are 25 available seats."
}
```

---

# AI Workflow

```
User

↓

Next.js Frontend

↓

FastAPI API

↓

AI Service

↓

PostgreSQL Database

↓

Response

↓

Frontend
```

---

# Technology Stack

## Frontend

- Next.js
- React
- Axios

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication

## Database

- PostgreSQL

---

# Validation

The AI responses were verified by:

- Testing API endpoints using Swagger
- Testing queries through the frontend
- Comparing results with database records
- Checking edge cases for invalid queries

---

# Future Improvements

- GPT Integration
- Smart search
- Voice commands
- Multi-language support
- Analytics and reporting
- Automatic seat recommendations

---

# Author

**Mohd Daniyal**

**Ethara Technical Assessment**

**Technology:** FastAPI • PostgreSQL • Next.js