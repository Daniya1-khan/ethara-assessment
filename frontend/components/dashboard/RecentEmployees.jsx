"use client";

export default function RecentEmployees({ employees }) {

    return (

        <div className="bg-white rounded-lg shadow p-5">

            <h2 className="text-xl font-bold mb-4">

                Recent Employees

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Department</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        employees.slice(0,5).map(emp=>(

                            <tr key={emp.id}>

                                <td>{emp.name}</td>

                                <td>{emp.department}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}