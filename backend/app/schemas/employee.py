from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional


class EmployeeCreate(BaseModel):
    employee_code: str
    name: str
    email: EmailStr
    department: str
    role: str
    joining_date: date
    project_id: Optional[int] = None


class EmployeeUpdate(BaseModel):
    name: str
    email: EmailStr
    department: str
    role: str
    joining_date: date
    status: str
    project_id: Optional[int] = None


class EmployeeResponse(BaseModel):
    id: int
    employee_code: str
    name: str
    email: str
    department: str
    role: str
    status: str

    class Config:
        from_attributes = True