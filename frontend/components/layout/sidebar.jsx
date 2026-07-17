"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaChair,
  FaExchangeAlt,
  FaRobot,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { href: "/employees", label: "Employees", icon: <FaUsers /> },
  { href: "/projects", label: "Projects", icon: <FaProjectDiagram /> },
  { href: "/seats", label: "Seats", icon: <FaChair /> },
  { href: "/allocation", label: "Allocation", icon: <FaExchangeAlt /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <aside className="w-72 sticky top-0 h-screen overflow-y-auto bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div className="p-6">
        <div className="mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-2xl text-sky-400">
            E
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Ethara</h1>
          <p className="mt-1 text-sm text-slate-500">Seat allocation dashboard</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-white shadow"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 p-6">
        <Link
          href="/ai"
          className="flex items-center justify-between gap-3 rounded-3xl bg-slate-800 px-4 py-3 text-sm font-medium text-sky-300 hover:bg-slate-700"
        >
          <span className="flex items-center gap-2">
            <FaRobot /> AI Assistant
          </span>
          <span>Go</span>
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded hover:bg-red-600 w-full text-left"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
