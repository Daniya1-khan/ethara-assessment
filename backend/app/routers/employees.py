from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

# Create Employee
@router.post("/")
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):

    existing = db.query(Employee).filter(
        Employee.email == employee.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_employee = Employee(
        employee_code=employee.employee_code,
        name=employee.name,
        email=employee.email,
        department=employee.department,
        role=employee.role,
        joining_date=employee.joining_date,
        project_id=employee.project_id
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return {
        "message": "Employee Created Successfully",
        "employee": new_employee
    }


# Get All Employees
@router.get("/")
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()


# Get Employee By ID
@router.get("/{employee_id}")
def get_employee(employee_id: int, db: Session = Depends(get_db)):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


# Update Employee
@router.put("/{employee_id}")
def update_employee(
    employee_id: int,
    data: EmployeeUpdate,
    db: Session = Depends(get_db)
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    employee.name = data.name
    employee.email = data.email
    employee.department = data.department
    employee.role = data.role
    employee.joining_date = data.joining_date
    employee.status = data.status
    employee.project_id = data.project_id

    db.commit()

    return {
        "message": "Employee Updated Successfully"
    }


# Delete (Deactivate) Employee
@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    employee.status = "Inactive"

    db.commit()

    return {
        "message": "Employee Deactivated Successfully"
    }