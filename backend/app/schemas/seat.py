from pydantic import BaseModel


class SeatCreate(BaseModel):
    floor: int
    zone: str
    bay: str
    seat_number: str
    status: str = "Available"


class SeatResponse(BaseModel):
    id: int
    floor: int
    zone: str
    bay: str
    seat_number: str
    status: str

    class Config:
        from_attributes = True