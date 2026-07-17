from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.database import get_db
from app.models.employee import Employee
from app.models.project import Project
from app.models.seat import Seat

router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


# Search Employees
@router.get("/employees")
def search_employees(
    keyword: str = Query(...),
    db: Session = Depends(get_db)
):

    employees = db.query(Employee).filter(
        or_(
            Employee.name.ilike(f"%{keyword}%"),
            Employee.email.ilike(f"%{keyword}%"),
            Employee.employee_code.ilike(f"%{keyword}%")
        )
    ).all()

    return employees


# Search Projects
@router.get("/projects")
def search_projects(
    keyword: str = Query(...),
    db: Session = Depends(get_db)
):

    return db.query(Project).filter(
        Project.name.ilike(f"%{keyword}%")
    ).all()


# Search Seats
@router.get("/seats")
def search_seats(
    floor: int | None = None,
    zone: str | None = None,
    status: str | None = None,
    db: Session = Depends(get_db)
):

    query = db.query(Seat)

    if floor is not None:
        query = query.filter(Seat.floor == floor)

    if zone:
        query = query.filter(Seat.zone == zone)

    if status:
        query = query.filter(Seat.status == status)

    return query.all()