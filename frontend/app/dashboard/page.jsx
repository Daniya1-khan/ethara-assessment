"use client";

import { useEffect, useState } from "react";
import { FaUsers, FaChair, FaProjectDiagram, FaCheckCircle, FaTable, FaChartPie } from "react-icons/fa";
import DashboardCard from "../../components/dashboard/DashboardCard";
import SeatStatusChart from "../../components/dashboard/SeatStatusChart";
import RecentEmployees from "../../components/dashboard/RecentEmployees";
import RecentAllocations from "../../components/dashboard/RecentAllocation";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import { getDashboardSummary } from "../../services/dashboard";

export default function Dashboard() {
    const [summary, setSummary] = useState({
        total_employees: 0,
        total_projects: 0,
        total_seats: 0,
        occupied_seats: 0,
        available_seats: 0
    });

    const [departmentStats, setDepartmentStats] = useState([]);
    const [recentEmployees, setRecentEmployees] = useState([]);
    const [recentAllocations, setRecentAllocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        setLoading(true);
        setError("");

        try {
            const dashboard = await getDashboardSummary();

            setSummary(dashboard.summary ?? summary);
            setDepartmentStats(dashboard.department_stats ?? []);
            setRecentEmployees(dashboard.recent_employees ?? []);
            setRecentAllocations(dashboard.recent_allocations ?? []);
        } catch (err) {
            console.error(err);
            setError("Unable to load dashboard data.");
        } finally {
            setLoading(false);
        }
    }

    const summaryCards = [
        {
            title: "Employees",
            value: summary.total_employees,
            icon: <FaUsers />,
            color: "text-blue-600",
            description: "Total active employees",
            href: "/employees"
        },
        {
            title: "Projects",
            value: summary.total_projects,
            icon: <FaProjectDiagram />,
            color: "text-green-600",
            description: "Total active projects",
            href: "/projects"
        },
        {
            title: "Total Seats",
            value: summary.total_seats,
            icon: <FaChair />,
            color: "text-orange-500",
            description: "All seats in the office",
            href: "/seats"
        },
        {
            title: "Occupied Seats",
            value: summary.occupied_seats,
            icon: <FaCheckCircle />,
            color: "text-purple-600",
            description: "Currently assigned seats",
            href: "/seats"
        },
        {
            title: "Available Seats",
            value: summary.available_seats,
            icon: <FaTable />,
            color: "text-sky-600",
            description: "Seats still available",
            href: "/seats"
        }
    ];

    return (
        <ProtectedRoute>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <p className="text-gray-500 mt-2">Welcome back, Admin 👋</p>
                </div>

                {error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                    {error}
                </div>
            ) : null}

            {loading ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                    Loading dashboard...
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                        {summaryCards.map((card) => (
                            <DashboardCard
                                key={card.title}
                                title={card.title}
                                value={card.value}
                                icon={card.icon}
                                color={card.color}
                                description={card.description}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <SeatStatusChart data={summary} />

                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {departmentStats.length > 0 ? (
                                departmentStats.slice(0, 4).map((item) => (
                                    <DashboardCard
                                        key={item.department}
                                        title={item.department}
                                        value={item.count}
                                        icon={<FaChartPie />}
                                        color="text-indigo-600"
                                        description="Employees in department"
                                    />
                                ))
                            ) : (
                                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                                    <h3 className="text-lg font-semibold text-slate-700">Department headcount</h3>
                                    <p className="text-sm text-slate-500 mt-2">No department data available yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RecentEmployees employees={recentEmployees} />
                        <RecentAllocations allocations={recentAllocations} />
                    </div>
                </>
            )}
            </div>
        </ProtectedRoute>
    );
}
