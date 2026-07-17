# Database Schema

## Employee

| Column | Type |
|---------|------|
| id | Integer |
| name | String |
| email | String |
| department | String |
| role | String |

---

## Project

| Column | Type |
|---------|------|
| id | Integer |
| name | String |
| description | Text |

---

## Seat

| Column | Type |
|---------|------|
| id | Integer |
| seat_number | String |
| floor | String |
| status | String |

---

## Seat Allocation

| Column | Type |
|---------|------|
| id | Integer |
| employee_id | FK |
| project_id | FK |
| seat_id | FK |
| allocation_status | String |
| allocation_date | Date |
| released_date | Date |
