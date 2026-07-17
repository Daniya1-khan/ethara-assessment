"use client";

import { usePathname } from "next/navigation";
import { FaBell, FaUserCircle } from "react-icons/fa";

const routeTitles = {
  "/dashboard": "Dashboard",
  "/employees": "Employees",
  "/projects": "Projects",
  "/seats": "Seats",
  "/allocation": "Allocation",
  "/ai": "AI Assistant",
};

export default function Navbar() {
  const pathname = usePathname();
  const title = routeTitles[pathname] || "Ethara";

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 shadow-sm">
      <div className="flex h-16 items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200">
            <FaBell />
          </button>
          <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
            <FaUserCircle className="text-lg" /> Admin
          </div>
        </div>
      </div>
    </header>
  );
}
