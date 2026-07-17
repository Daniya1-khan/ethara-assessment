from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.seat import Seat
from app.models.project import Project
from app.schemas.seat import SeatCreate
from app.schemas.allocation import SeatAllocate
from app.services.allocation_service import allocate_seat

router = APIRouter(
    prefix="/seats",
    tags=["Seats"]
)


# Create Seat
@router.post("/")
def create_seat(
    seat: SeatCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(Seat).filter(
        Seat.seat_number == seat.seat_number
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Seat already exists"
        )

    new_seat = Seat(
        floor=seat.floor,
        zone=seat.zone,
        bay=seat.bay,
        seat_number=seat.seat_number,
        status=seat.status
    )

    db.add(new_seat)
    db.commit()
    db.refresh(new_seat)

    return {
        "message": "Seat Created Successfully",
        "seat": new_seat
    }


# Get All Seats
@router.get("/")
def get_seats(
    db: Session = Depends(get_db)
):
    return db.query(Seat).all()


# Update Seat
@router.put("/{seat_id}")
def update_seat(seat_id: int, seat: SeatCreate, db: Session = Depends(get_db)):
    existing = db.query(Seat).filter(Seat.id == seat_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Seat not found")

    if seat.seat_number != existing.seat_number:
        duplicate = db.query(Seat).filter(Seat.seat_number == seat.seat_number).first()
        if duplicate:
            raise HTTPException(status_code=400, detail="Seat number already exists")

    existing.floor = seat.floor
    existing.zone = seat.zone
    existing.bay = seat.bay
    existing.seat_number = seat.seat_number
    existing.status = seat.status

    db.commit()
    db.refresh(existing)

    return {
        "message": "Seat updated successfully",
        "seat": existing
    }


# Delete Seat
@router.delete("/{seat_id}")
def delete_seat(seat_id: int, db: Session = Depends(get_db)):
    seat = db.query(Seat).filter(Seat.id == seat_id).first()
    if not seat:
        raise HTTPException(status_code=404, detail="Seat not found")

    db.delete(seat)
    db.commit()

    return {"message": "Seat deleted successfully"}


# Available Seats
@router.get("/available")
def available_seats(
    db: Session = Depends(get_db)
):
    return db.query(Seat).filter(
        Seat.status == "Available"
    ).all()

@router.post("/allocate")
def allocate(
    data: SeatAllocate,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(Project.id == data.project_id).first()
    if not project:
        raise HTTPException(status_code=400, detail="Project not found")

    return allocate_seat(
        db,
        data.employee_id,
        data.seat_id,
        data.project_id
    )