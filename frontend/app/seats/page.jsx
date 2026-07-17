"use client";

import { useEffect, useState } from "react";
import { getSeats, deleteSeat } from "../../services/seat";
import SeatForm from "../../components/forms/SeatForm";

export default function Seats() {

    const [seats, setSeats] = useState([]);
    const [search, setSearch] = useState("");
    const [editingSeat, setEditingSeat] = useState(null);

    const filteredSeats = seats.filter((seat) => {
        const query = search.toLowerCase();
        return [seat.floor, seat.zone, seat.bay, seat.seat_number, seat.status].some((value) =>
            value != null && String(value).toLowerCase().includes(query)
        );
    });

    useEffect(() => {
        loadSeats();
    }, []);

    async function loadSeats() {

        try {

            const data = await getSeats();

            setSeats(data);

        } catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">Seats</h1>
                    <p className="text-sm text-slate-500">Add new seats and review seat availability.</p>
                </div>

                <div className="w-full md:w-96">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search seats..."
                        className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <SeatForm refresh={loadSeats} editingSeat={editingSeat} clearEditing={() => setEditingSeat(null)} />

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Floor</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Zone</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Bay</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Seat No</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Status</th>
                                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredSeats.map((seat)=>(
                                <tr key={seat.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-700">{seat.floor}</td>
                                    <td className="px-6 py-4 text-slate-700">{seat.zone}</td>
                                    <td className="px-6 py-4 text-slate-700">{seat.bay}</td>
                                    <td className="px-6 py-4 text-slate-700">{seat.seat_number}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${seat.status === "Available" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                                            {seat.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingSeat(seat)}
                                                className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    if (!confirm("Delete this seat?")) return;
                                                    await deleteSeat(seat.id);
                                                    loadSeats();
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