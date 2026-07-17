from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.database.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_code = Column(String(20), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    department = Column(String(100))
    role = Column(String(100))
    joining_date = Column(Date)
    status = Column(String(20), default="Active")
    project_id = Column(Integer, ForeignKey("projects.id"))