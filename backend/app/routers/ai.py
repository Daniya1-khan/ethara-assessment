from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.employee import Employee
from app.models.project import Project
from app.models.seat import Seat
from app.schemas.ai import AIQuery

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


@router.post("/query")
def ai_query(
    data: AIQuery,
    db: Session = Depends(get_db)
):

    query = data.query.lower()

    # Available Seats
    if "available seat" in query or "available seats" in query:

        seats = db.query(Seat).filter(
            Seat.status == "Available"
        ).all()

        return {
            "answer": [
                {
                    "floor": seat.floor,
                    "zone": seat.zone,
                    "bay": seat.bay,
                    "seat_number": seat.seat_number
                }
                for seat in seats
            ]
        }

    # Occupied Seats Count
    elif "occupied" in query:

        total = db.query(Seat).filter(
            Seat.status == "Occupied"
        ).count()

        return {
            "answer": f"{total} seats are occupied."
        }

    # Employee Project
    elif "project" in query:

        words = query.split()

        employee_name = words[-1]

        employee = db.query(Employee).filter(
            Employee.name.ilike(f"%{employee_name}%")
        ).first()

        if not employee:
            return {
                "answer": "Employee not found."
            }

        project = db.query(Project).filter(
            Project.id == employee.project_id
        ).first()

        if not project:
            return {
                "answer": "Project not assigned."
            }

        return {
            "answer": f"{employee.name} is assigned to {project.name}"
        }

    return {
        "answer": "Sorry, I don't understand your question."
    }