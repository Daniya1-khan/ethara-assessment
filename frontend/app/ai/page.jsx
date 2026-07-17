"use client";

import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AIPage() {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    async function askAI() {

        if (!question.trim()) {
            toast.error("Enter a question");
            return;
        }

        try {

            const res = await api.post("/ai/query", {
                query: question
            });

            setMessages((prev) => [

                ...prev,

                {
                    type: "user",
                    text: question
                },

                {
                    type: "bot",
                    text:
                        typeof res.data.answer === "string"
                            ? res.data.answer
                            : JSON.stringify(res.data.answer, null, 2)
                }

            ]);

            setQuestion("");

        } catch (err) {

            console.log(err);

            toast.error("AI request failed");

        }

    }

    return (

        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-6">

                🤖 Ethara AI Assistant

            </h1>

            <div className="bg-white rounded-lg shadow h-[500px] overflow-y-auto p-5">

                {

                    messages.map((msg, index)=>(

                        <div
                            key={index}
                            className={`mb-4 ${
                                msg.type==="user"
                                ? "text-right"
                                : "text-left"
                            }`}
                        >

                            <div
                                className={`inline-block px-4 py-3 rounded-lg ${
                                    msg.type==="user"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                                }`}
                            >

                                <pre className="whitespace-pre-wrap">
                                    {msg.text}
                                </pre>

                            </div>

                        </div>

                    ))

                }

            </div>

            <div className="flex mt-5 gap-3">

                <input

                    className="border flex-1 p-3 rounded"

                    placeholder="Ask anything..."

                    value={question}

                    onChange={(e)=>setQuestion(e.target.value)}

                />

                <button

                    onClick={askAI}

                    className="bg-blue-600 text-white px-6 rounded"

                >

                    Send

                </button>

            </div>

        </div>

    );

}