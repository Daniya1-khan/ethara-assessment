from sqlalchemy import Column, Integer, String
from app.database.database import Base


class Seat(Base):
    __tablename__ = "seats"

    id = Column(Integer, primary_key=True, index=True)
    floor = Column(Integer)
    zone = Column(String(20))
    bay = Column(String(20))
    seat_number = Column(String(20), unique=True)
    status = Column(String(20), default="Available")