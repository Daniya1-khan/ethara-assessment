"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

export default function SeatStatusChart({ data }) {

    const chartData = [
        {
            name: "Occupied",
            value: data.occupied_seats
        },
        {
            name: "Available",
            value: data.available_seats
        }
    ];

    const COLORS = ["#2563EB", "#22C55E"];

    return (

        <div className="bg-white p-6 rounded-lg shadow">

            <h2 className="text-xl font-bold mb-5">
                Seat Status
            </h2>

            <PieChart width={350} height={300}>

                <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={100}
                    label
                >

                    {

                        chartData.map((entry,index)=>(

                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />

                        ))

                    }

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </div>

    );

}