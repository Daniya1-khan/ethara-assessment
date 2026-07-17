from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db
from app.models.employee import Employee
from app.models.project import Project
from app.models.seat import Seat
from app.models.seat_allocation import SeatAllocation

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/")
def dashboard(db: Session = Depends(get_db)):

    total_employees = db.query(Employee).count()

    total_projects = db.query(Project).count()

    total_seats = db.query(Seat).count()

    occupied_seats = db.query(Seat).filter(
        Seat.status == "Occupied"
    ).count()

    available_seats = db.query(Seat).filter(
        Seat.status == "Available"
    ).count()

    department_stats = (
        db.query(
            Employee.department,
            func.count(Employee.id)
        )
        .group_by(Employee.department)
        .all()
    )

    recent_employees = (
        db.query(Employee)
        .order_by(Employee.id.desc())
        .limit(5)
        .all()
    )

    recent_allocations = (
        db.query(
            SeatAllocation.id,
            Employee.name.label("employee_name"),
            Seat.seat_number.label("seat_number"),
            Project.name.label("project_name")
        )
        .join(Employee, SeatAllocation.employee_id == Employee.id)
        .join(Seat, SeatAllocation.seat_id == Seat.id)
        .outerjoin(Project, SeatAllocation.project_id == Project.id)
        .order_by(SeatAllocation.id.desc())
        .limit(5)
        .all()
    )

    return {

        "summary":{

            "total_employees":total_employees,

            "total_projects":total_projects,

            "total_seats":total_seats,

            "occupied_seats":occupied_seats,

            "available_seats":available_seats

        },

        "department_stats":[

            {
                "department":d[0],
                "count":d[1]
            }

            for d in department_stats

        ],

        "recent_employees":[

            {
                "id":e.id,
                "name":e.name,
                "department":e.department
            }

            for e in recent_employees

        ],

        "recent_allocations":[

            {
                "id":a.id,
                "employee_name":a.employee_name,
                "seat_number":a.seat_number,
                "project_name":a.project_name
            }

            for a in recent_allocations

        ]

    }