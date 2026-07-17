"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";
import { getProjects } from "../../services/project";

export default function Allocation() {

    const [employees, setEmployees] = useState([]);
    const [seats, setSeats] = useState([]);
    const [projects, setProjects] = useState([]);

    const [form, setForm] = useState({
        employee_id: "",
        seat_id: "",
        project_id: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {

        try {

            const emp = await api.get("/employees");
            const seat = await api.get("/seats");
            const projectResponse = await getProjects();

            setEmployees(emp.data);

            setSeats(
                seat.data.filter(
                    s => s.status === "Available"
                )
            );

            setProjects(projectResponse);

        } catch (err) {

            console.log(err);

        }

    }

    async function allocate(e) {

        e.preventDefault();

        const payload = {
            employee_id: Number(form.employee_id),
            seat_id: Number(form.seat_id),
            project_id: Number(form.project_id),
        };

        if (!payload.employee_id || !payload.seat_id || !payload.project_id) {
            alert("Please select an employee, a seat, and enter a valid project ID.");
            return;
        }

        try {

            await api.post("/seats/allocate", payload);

            alert("Seat Allocated Successfully");

            loadData();

        }

        catch (err) {

            console.log(err);

            alert("Allocation Failed");

        }

    }

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Seat Allocation

            </h1>

            <form
                onSubmit={allocate}
                className="bg-white shadow rounded p-6"
            >

                <select
                    className="border p-2 w-full mb-3"
                    onChange={(e)=>setForm({...form,employee_id:e.target.value})}
                >

                    <option>Select Employee</option>

                    {

                        employees.map(emp=>(

                            <option
                                key={emp.id}
                                value={emp.id}
                            >

                                {emp.name}

                            </option>

                        ))

                    }

                </select>

                <select
                    className="border p-2 w-full mb-3"
                    onChange={(e)=>setForm({...form,seat_id:e.target.value})}
                >

                    <option>Select Seat</option>

                    {

                        seats.map(seat=>(

                            <option
                                key={seat.id}
                                value={seat.id}
                            >

                                {seat.seat_number}

                            </option>

                        ))

                    }

                </select>

                <select
                    className="border p-2 w-full mb-4 rounded-lg"
                    value={form.project_id}
                    onChange={(e) => setForm({ ...form, project_id: e.target.value })}
                >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>

                <button
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                >

                    Allocate Seat

                </button>

            </form>

        </div>

    );

}