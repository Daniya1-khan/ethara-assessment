from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.database.database import engine, Base
# Import ALL models
from app.models.user import User
from app.models.employee import Employee
from app.models.project import Project
from app.models.seat import Seat
from app.models.seat_allocation import SeatAllocation

from app.routers.auth import router as auth_router
from app.routers.employees import router as employee_router
from app.routers.projects import router as project_router
from app.routers.seats import router as seat_router
from app.routers.dashboard import router as dashboard_router
from app.routers.ai import router as ai_router
from app.routers.search import router as search_router

app = FastAPI(
    title="Ethara Seat Allocation API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(employee_router)
app.include_router(project_router)
app.include_router(seat_router)
app.include_router(dashboard_router)
app.include_router(ai_router)
app.include_router(search_router)

@app.get("/")
def home():
    return {"message": "Backend Running"}