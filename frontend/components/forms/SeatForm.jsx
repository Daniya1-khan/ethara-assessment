"use client";

import { useEffect, useState } from "react";
import { createSeat, updateSeat } from "../../services/seat";

const initialSeat = {
    floor: "",
    zone: "",
    bay: "",
    seat_number: "",
    status: "Available"
};

export default function SeatForm({ refresh, editingSeat, clearEditing }) {

    const [seat, setSeat] = useState(initialSeat);

    useEffect(() => {
        if (editingSeat) {
            setSeat({
                floor: editingSeat.floor ?? "",
                zone: editingSeat.zone ?? "",
                bay: editingSeat.bay ?? "",
                seat_number: editingSeat.seat_number ?? "",
                status: editingSeat.status ?? "Available"
            });
        } else {
            setSeat(initialSeat);
        }
    }, [editingSeat]);

    async function submit(e) {
        e.preventDefault();

        try {
            if (editingSeat) {
                await updateSeat(editingSeat.id, seat);
                alert("Seat updated successfully");
                clearEditing?.();
            } else {
                await createSeat(seat);
                alert("Seat created successfully");
            }

            refresh();
            setSeat(initialSeat);
        } catch (err) {
            console.log(err);
            alert(editingSeat ? "Error updating seat" : "Unable to create seat");
        }
    }

    return (
        <form onSubmit={submit} className="bg-white shadow rounded p-6 mb-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        {editingSeat ? "Edit Seat" : "Add Seat"}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {editingSeat ? "Update the seat details." : "Create a new seat record."}
                    </p>
                </div>
                {editingSeat ? (
                    <button
                        type="button"
                        onClick={() => {
                            clearEditing?.();
                            setSeat(initialSeat);
                        }}
                        className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                        Cancel edit
                    </button>
                ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <input
                    placeholder="Floor"
                    type="number"
                    className="border p-3 rounded-lg outline-none focus:border-sky-500"
                    value={seat.floor}
                    onChange={(e) => setSeat({ ...seat, floor: e.target.value })}
                />
                <input
                    placeholder="Zone"
                    className="border p-3 rounded-lg outline-none focus:border-sky-500"
                    value={seat.zone}
                    onChange={(e) => setSeat({ ...seat, zone: e.target.value })}
                />
                <input
                    placeholder="Bay"
                    className="border p-3 rounded-lg outline-none focus:border-sky-500"
                    value={seat.bay}
                    onChange={(e) => setSeat({ ...seat, bay: e.target.value })}
                />
                <input
                    placeholder="Seat Number"
                    className="border p-3 rounded-lg outline-none focus:border-sky-500"
                    value={seat.seat_number}
                    onChange={(e) => setSeat({ ...seat, seat_number: e.target.value })}
                />
                <select
                    className="border p-3 rounded-lg outline-none focus:border-sky-500 md:col-span-2"
                    value={seat.status}
                    onChange={(e) => setSeat({ ...seat, status: e.target.value })}
                >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Reserved">Reserved</option>
                </select>
            </div>

            <button
                type="submit"
                className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                {editingSeat ? "Update Seat" : "Save Seat"}
            </button>
        </form>
    );
}