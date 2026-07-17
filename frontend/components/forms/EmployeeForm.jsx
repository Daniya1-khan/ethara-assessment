"use client";

import { useEffect, useState } from "react";
import { createEmployee, updateEmployee } from "../../services/employee";

export default function EmployeeForm({ refresh, editingEmployee, clearEditing }) {

    const [form, setForm] = useState({
        employee_code: "",
        name: "",
        email: "",
        department: "",
        role: "",
        joining_date: "",
        status: "Active",
        project_id: null
    });

    useEffect(() => {
        if (editingEmployee) {
            setForm({
                employee_code: editingEmployee.employee_code || "",
                name: editingEmployee.name || "",
                email: editingEmployee.email || "",
                department: editingEmployee.department || "",
                role: editingEmployee.role || "",
                joining_date: editingEmployee.joining_date || "",
                status: editingEmployee.status || "Active",
                project_id: editingEmployee.project_id || null,
            });
        } else {
            setForm({
                employee_code: "",
                name: "",
                email: "",
                department: "",
                role: "",
                joining_date: "",
                status: "Active",
                project_id: null,
            });
        }
    }, [editingEmployee]);

    async function submit(e) {
        e.preventDefault();

        try {
            if (editingEmployee) {
                await updateEmployee(editingEmployee.id, form);
                alert("Employee Updated Successfully");
                clearEditing();
            } else {
                await createEmployee(form);
                alert("Employee Added Successfully");
            }

            refresh();
            setForm({
                employee_code: "",
                name: "",
                email: "",
                department: "",
                role: "",
                joining_date: "",
                status: "Active",
                project_id: null
            });
        } catch (err) {
            console.log(err);
            alert(editingEmployee ? "Error updating employee" : "Error adding employee");
        }
    }

    return (

        <form
            onSubmit={submit}
            className="bg-white p-6 rounded shadow mb-6"
        >

            <h2 className="text-2xl font-bold mb-4">
                Add Employee
            </h2>

            <div className="grid grid-cols-2 gap-4">

                <input
                    placeholder="Employee Code"
                    className="border p-2"
                    value={form.employee_code}
                    onChange={(e)=>setForm({...form,employee_code:e.target.value})}
                />

                <input
                    placeholder="Name"
                    className="border p-2"
                    value={form.name}
                    onChange={(e)=>setForm({...form,name:e.target.value})}
                />

                <input
                    placeholder="Email"
                    className="border p-2"
                    value={form.email}
                    onChange={(e)=>setForm({...form,email:e.target.value})}
                />

                <input
                    placeholder="Department"
                    className="border p-2"
                    value={form.department}
                    onChange={(e)=>setForm({...form,department:e.target.value})}
                />

                <input
                    placeholder="Role"
                    className="border p-2"
                    value={form.role}
                    onChange={(e)=>setForm({...form,role:e.target.value})}
                />

                <input
                    type="date"
                    className="border p-2"
                    value={form.joining_date}
                    onChange={(e)=>setForm({...form,joining_date:e.target.value})}
                />

            </div>

            <div className="flex items-center gap-3 mt-5">
                {editingEmployee ? (
                    <button
                        type="button"
                        onClick={clearEditing}
                        className="bg-gray-200 text-slate-700 px-5 py-2 rounded"
                    >
                        Cancel
                    </button>
                ) : null}

                <button
                    className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                    {editingEmployee ? "Update Employee" : "Save Employee"}
                </button>
            </div>

        </form>

    );

}