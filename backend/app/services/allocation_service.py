from datetime import datetime

from fastapi import HTTPException

from app.models.employee import Employee
from app.models.seat import Seat
from app.models.seat_allocation import SeatAllocation


def allocate_seat(db, employee_id, seat_id, project_id):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            404,
            "Employee not found"
        )

    seat = db.query(Seat).filter(
        Seat.id == seat_id
    ).first()

    if not seat:
        raise HTTPException(
            404,
            "Seat not found"
        )

    if seat.status != "Available":
        raise HTTPException(
            400,
            "Seat is not available"
        )

    existing = db.query(
        SeatAllocation
    ).filter(
        SeatAllocation.employee_id == employee_id,
        SeatAllocation.allocation_status == "Allocated"
    ).first()

    if existing:
        raise HTTPException(
            400,
            "Employee already has a seat"
        )

    allocation = SeatAllocation(
        employee_id=employee_id,
        seat_id=seat_id,
        project_id=project_id
    )

    seat.status = "Occupied"

    db.add(allocation)

    db.commit()

    return {
        "message": "Seat Allocated Successfully"
    }