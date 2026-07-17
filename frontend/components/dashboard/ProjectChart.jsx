"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts";

export default function ProjectChart({ data }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-xl font-bold mb-5">
                Employees by Department
            </h2>

            {data?.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#2563EB" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-gray-500">No department distribution available yet.</p>
            )}
        </div>
    );
}
