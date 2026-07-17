export default function RecentAllocations({ allocations }) {

    return (

        <div className="bg-white rounded-xl shadow-md p-5">

            <h2 className="text-xl font-bold mb-4">

                Recent Allocations

            </h2>

            {allocations.length === 0 ? (
                <p className="text-gray-500">No recent allocations available.</p>
            ) : (
                <table className="w-full text-left">

                    <thead>

                        <tr className="text-sm text-gray-500 border-b">
                            <th className="pb-3">Employee</th>
                            <th className="pb-3">Seat</th>
                            <th className="pb-3">Project</th>
                        </tr>

                    </thead>

                    <tbody>

                        {allocations.slice(0, 5).map((item) => (
                            <tr key={item.id} className="border-b last:border-b-0">
                                <td className="py-3">{item.employee_name}</td>
                                <td className="py-3">{item.seat_number}</td>
                                <td className="py-3">{item.project_name ?? "—"}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            )}

        </div>

    );

}