"use client";

import Link from "next/link";

export default function DashboardCard({ title, value, icon, color, description, href }) {
    const content = (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 transition-shadow duration-200 hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-semibold text-slate-700">{title}</h3>
                    {description ? <p className="text-sm text-slate-500 mt-1">{description}</p> : null}
                </div>
                <div className={`text-3xl ${color}`}>{icon}</div>
            </div>
            <div className="text-4xl font-bold text-slate-900">{value}</div>
        </div>
    );

    if (!href) return content;

    return (
        <Link href={href} className="block">
            {content}
        </Link>
    );
}
