"use client";

import { useRouter } from "next/navigation";

export default function AIWidget() {

    const router = useRouter();

    return (

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">

            <h2 className="text-2xl font-bold">

                🤖 Ethara AI Assistant

            </h2>

            <p className="mt-3">

                Ask anything about employees, projects and seats.

            </p>

            <button

                onClick={()=>router.push("/ai")}

                className="bg-white text-blue-600 mt-5 px-5 py-2 rounded"

            >

                Open AI Assistant

            </button>

        </div>

    );

}