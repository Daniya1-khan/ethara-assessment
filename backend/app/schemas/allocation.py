from pydantic import BaseModel


class SeatAllocate(BaseModel):
    employee_id: int
    seat_id: int
    project_id: int


class SeatRelease(BaseModel):
    employee_id: int