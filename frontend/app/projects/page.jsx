"use client";

import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../../services/project";
import ProjectForm from "../../components/forms/ProjectForm";

export default function Projects() {

    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [editingProject, setEditingProject] = useState(null);

    const filteredProjects = projects.filter((project) => {
        const query = search.toLowerCase();
        return [project.name, project.manager_name, project.status].some((value) =>
            value?.toLowerCase().includes(query)
        );
    });

    useEffect(() => {
        loadProjects();
    }, []);

    async function loadProjects() {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">Projects</h1>
                    <p className="text-sm text-slate-500">Create and review active project records.</p>
                </div>

                <div className="w-full md:w-96">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search projects..."
                        className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <ProjectForm refresh={loadProjects} editingProject={editingProject} clearEditing={() => setEditingProject(null)} />

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Name</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Manager</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Status</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredProjects.map((project)=>(
                                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-700">{project.name}</td>
                                    <td className="px-6 py-4 text-slate-700">{project.manager_name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${project.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingProject(project)}
                                                className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    if (!confirm("Delete this project?")) return;
                                                    await deleteProject(project.id);
                                                    loadProjects();
                                                }}
                                                className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
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