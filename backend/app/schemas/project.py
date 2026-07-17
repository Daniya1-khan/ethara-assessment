from pydantic import BaseModel


class ProjectCreate(BaseModel):
    name: str
    description: str
    manager_name: str
    status: str = "Active"


class ProjectResponse(BaseModel):
    id: int
    name: str
    description: str
    manager_name: str
    status: str

    class Config:
        from_attributes = True