# AI_prompt.md

# AI Assistant Prompt Documentation

## Project

**Ethara Seat Management System**

---

## Objective

The AI Assistant is designed to help administrators retrieve seat management information using simple natural language queries. It acts as an intelligent interface between the user and the system by interpreting user requests and returning relevant information about employees, projects, seats, and allocations.

---

## Supported Queries

The AI Assistant supports queries such as:

### Seat Information

- Show available seats
- Show occupied seats
- List all available seats
- How many seats are available?
- Show all occupied seats

### Employee Information

- Find employee by name
- Show all employees
- Show employees in HR department
- Show employees in IT department
- Search employee John

### Project Information

- Show all projects
- Find project by name
- List active projects

### Seat Allocation

- Show seat allocation
- Which seat is assigned to John?
- Show allocated employees
- Show released seats

---

## Sample Prompts

### Example 1

**User**

```
Show available seats
```

**Response**

```
There are 25 available seats.

Seat Numbers:

A101
A102
A105
B201
B203
```

---

### Example 2

**User**

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

### Example 3

**User**

```
Show occupied seats
```

**Response**

```
Occupied Seats

A103
A104
A106
B101
```

---

### Example 4

**User**

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

## Backend Endpoint

```
POST /ai/query
```

---

## Request Body

```json
{
    "query": "Show available seats"
}
```

---

## Example Response

```json
{
    "answer": "There are 25 available seats."
}
```

---

## AI Processing Flow

```
User Query

↓

Frontend (Next.js)

↓

FastAPI Endpoint

↓

AI Service

↓

Database Query

↓

Generate Response

↓

Return JSON

↓

Display Response
```

---

## Technologies Used

### Frontend

- Next.js
- React
- Axios

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication

### Database

- PostgreSQL

---

## Future Improvements

The AI Assistant can be extended to support:

- Department-wise seat statistics
- Floor-wise seat availability
- Employee recommendations
- Automatic seat assignment
- Natural language filtering
- Analytics and reporting
- Integration with Large Language Models (LLMs) such as OpenAI GPT

---

## Notes

The current implementation uses predefined query handling to interpret common seat management requests. The architecture is modular, making it straightforward to integrate more advanced NLP or LLM-based capabilities in the future.

---

## Author

**Mohd Daniyal**

Ethara Technical Assessment

FastAPI + PostgreSQL + Next.js
