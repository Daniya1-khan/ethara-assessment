from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from datetime import datetime

from app.database.database import Base


class SeatAllocation(Base):

    __tablename__ = "seat_allocations"

    id = Column(Integer, primary_key=True)

    employee_id = Column(Integer, ForeignKey("employees.id"))

    seat_id = Column(Integer, ForeignKey("seats.id"))

    project_id = Column(Integer, ForeignKey("projects.id"))

    allocation_status = Column(
        String(20),
        default="Allocated"
    )

    allocation_date = Column(
        DateTime,
        default=datetime.utcnow
    )

    released_date = Column(
        DateTime,
        nullable=True
    )