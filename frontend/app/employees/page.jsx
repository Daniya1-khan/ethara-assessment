"use client";

import { useEffect, useState } from "react";
import EmployeeForm from "../../components/forms/EmployeeForm";

import {
    getEmployees,
    deleteEmployee,
    updateEmployee
} from "../../services/employee";

export default function Employees() {

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [editingEmployee, setEditingEmployee] = useState(null);

    const filteredEmployees = employees.filter((emp) => {
        const query = search.toLowerCase();
        return [
            emp.employee_code,
            emp.name,
            emp.email,
            emp.department,
            emp.role,
        ].some((value) => value != null && String(value).toLowerCase().includes(query));
    });

    useEffect(() => {
        loadEmployees();
    }, []);

    async function loadEmployees() {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function removeEmployee(id) {

        if (!confirm("Delete this employee?")) return;

        try {

            await deleteEmployee(id);

            alert("Employee deleted successfully");

            loadEmployees();

        } catch (error) {

            console.log(error);

            alert("Unable to delete employee");

        }

    }

    return (

        <div className="space-y-8">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">Employees</h1>
                    <p className="text-sm text-slate-500">Manage employee records and view the active employee list.</p>
                </div>

                <div className="w-full md:w-96">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search employees..."
                        className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <EmployeeForm
                    refresh={loadEmployees}
                    editingEmployee={editingEmployee}
                    clearEditing={() => setEditingEmployee(null)}
                />

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Code</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Name</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Email</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Department</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Role</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredEmployees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-700">{emp.employee_code}</td>
                                    <td className="px-6 py-4 text-slate-700">{emp.name}</td>
                                    <td className="px-6 py-4 text-slate-700">{emp.email}</td>
                                    <td className="px-6 py-4 text-slate-700">{emp.department}</td>
                                    <td className="px-6 py-4 text-slate-700">{emp.role}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => setEditingEmployee(emp)}
                                                className="rounded-full border border-amber-400 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => removeEmployee(emp.id)}
                                                className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );

}