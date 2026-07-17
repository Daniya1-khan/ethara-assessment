"use client";

import { useEffect, useState } from "react";
import { createProject, updateProject } from "../../services/project";

const initialState = {
    name: "",
    description: "",
    manager_name: "",
    status: "Active"
};

export default function ProjectForm({ refresh, editingProject, clearEditing }) {

    const [project, setProject] = useState(initialState);

    useEffect(() => {
        if (editingProject) {
            setProject({
                name: editingProject.name || "",
                description: editingProject.description || "",
                manager_name: editingProject.manager_name || "",
                status: editingProject.status || "Active"
            });
        } else {
            setProject(initialState);
        }
    }, [editingProject]);

    async function submit(e) {
        e.preventDefault();

        try {
            if (editingProject) {
                await updateProject(editingProject.id, project);
                alert("Project updated successfully");
                clearEditing?.();
            } else {
                await createProject(project);
                alert("Project added successfully");
            }

            refresh();
            setProject(initialState);
        } catch (err) {
            console.log(err);
            alert(editingProject ? "Error updating project" : "Error creating project");
        }
    }

    return (
        <form onSubmit={submit} className="bg-white shadow rounded p-5 mb-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        {editingProject ? "Edit Project" : "Add Project"}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {editingProject ? "Update the project details." : "Create a new project record."}
                    </p>
                </div>
                {editingProject ? (
                    <button
                        type="button"
                        onClick={() => {
                            clearEditing?.();
                            setProject(initialState);
                        }}
                        className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                        Cancel edit
                    </button>
                ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <input
                    placeholder="Project Name"
                    className="border p-3 rounded-lg outline-none focus:border-sky-500"
                    value={project.name}
                    onChange={(e) => setProject({ ...project, name: e.target.value })}
                />
                <input
                    placeholder="Manager"
                    className="border p-3 rounded-lg outline-none focus:border-sky-500"
                    value={project.manager_name}
                    onChange={(e) => setProject({ ...project, manager_name: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    className="border p-3 rounded-lg outline-none focus:border-sky-500 md:col-span-2"
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                />
                <select
                    className="border p-3 rounded-lg outline-none focus:border-sky-500"
                    value={project.status}
                    onChange={(e) => setProject({ ...project, status: e.target.value })}
                >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                </select>
            </div>

            <button
                type="submit"
                className="mt-5 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
            >
                {editingProject ? "Update Project" : "Save Project"}
            </button>
        </form>
    );
}
