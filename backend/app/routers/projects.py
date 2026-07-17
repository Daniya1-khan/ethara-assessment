from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.project import Project
from app.models.employee import Employee
from app.schemas.project import ProjectCreate

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


# Create Project
@router.post("/")
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):

    existing = db.query(Project).filter(
        Project.name == project.name
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Project already exists"
        )

    new_project = Project(
        name=project.name,
        description=project.description,
        manager_name=project.manager_name,
        status=project.status
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return {
        "message": "Project Created Successfully",
        "project": new_project
    }


# List Projects
@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

# Update Project
@router.put("/{project_id}")
def update_project(project_id: int, project: ProjectCreate, db: Session = Depends(get_db)):
    existing = db.query(Project).filter(Project.id == project_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")

    if project.name != existing.name:
        duplicate = db.query(Project).filter(Project.name == project.name).first()
        if duplicate:
            raise HTTPException(status_code=400, detail="Project name already exists")

    existing.name = project.name
    existing.description = project.description
    existing.manager_name = project.manager_name
    existing.status = project.status

    db.commit()
    db.refresh(existing)

    return {
        "message": "Project updated successfully",
        "project": existing
    }


# Delete Project
@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()

    return {"message": "Project deleted successfully"}

# Employees of Project
@router.get("/{project_id}/employees")
def project_employees(
    project_id: int,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    employees = db.query(Employee).filter(
        Employee.project_id == project_id
    ).all()

    return employees