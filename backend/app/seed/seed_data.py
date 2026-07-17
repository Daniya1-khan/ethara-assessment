from faker import Faker
from random import choice, randint
from datetime import date

from app.database.database import SessionLocal
from app.models.project import Project
from app.models.employee import Employee
from app.models.seat import Seat

fake = Faker()

db = SessionLocal()

# ----------------------------
# Create Projects
# ----------------------------

projects = [
    "Indigo",
    "Indreed",
    "Mydreed",
    "Preed",
    "Serfy",
    "Oreed",
    "Bedegreed",
    "Opreed",
    "Serry",
    "Kaary"
]

if db.query(Project).count() == 0:

    for project in projects:

        db.add(
            Project(
                name=project,
                description=f"{project} Project",
                manager_name=fake.name(),
                status="Active"
            )
        )

    db.commit()

print("Projects Created")


# ----------------------------
# Create Seats
# ----------------------------

if db.query(Seat).count() == 0:

    for floor in range(1, 6):

        for zone in ["A", "B", "C", "D", "E"]:

            for seat in range(1, 221):

                status = "Available"

                if randint(1, 100) <= 5:
                    status = "Reserved"

                db.add(
                    Seat(
                        floor=floor,
                        zone=zone,
                        bay=f"Bay-{randint(1,10)}",
                        seat_number=f"{floor}{zone}-{seat}",
                        status=status
                    )
                )

    db.commit()

print("Seats Created")


# ----------------------------
# Create Employees
# ----------------------------

project_ids = [p.id for p in db.query(Project).all()]

count = db.query(Employee).count()

if count < 100:

    for i in range(count + 1, 101):

        db.add(
            Employee(
                employee_code=f"EMP{i:05}",
                name=fake.name(),
                email=f"user{i}@ethara.com",
                department=choice(
                    [
                        "AI",
                        "HR",
                        "Finance",
                        "IT",
                        "Operations"
                    ]
                ),
                role="Software Engineer",
                joining_date=date.today(),
                status="Active",
                project_id=choice(project_ids)
            )
        )

    db.commit()

print("Employees Created")

db.close()

print("Done")