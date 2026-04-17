'use client';

import { useEffect, useState } from "react";
import { getRegistrationsBySession } from "@/firebase/api";

const sessions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
];

// Format Session Label(e.g. 1 -> Session 1)
const formatSessionLabel = (sessionId: string) => {
  return `Session ${sessionId}`;
};

export default function AdminPage() {

    const [activeSession, setActiveSession] = useState("1");
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async (sessionId: string) => {
        setLoading(true);
        try {
            const res = await getRegistrationsBySession(sessionId);
            setData(res);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    // Load default session
    useEffect(() => {
        fetchData(activeSession);
    }, [activeSession]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#030712] to-[#020617] text-white flex mt-10 justify-center p-6">

            <div className="w-full max-w-5xl">

                {/* Header Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6 shadow-xl">
                    <h1 className="text-3xl font-bold tracking-tight">
                        User Registrations
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {sessions.map((session) => (
                        <button
                            key={session}
                            onClick={() => setActiveSession(session)}
                            className={`
                                px-4 py-2 rounded-full border transition-all duration-200
                                text-sm font-medium
                                ${activeSession === session
                                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                }
                            `}
                        >
                            {formatSessionLabel(session)}
                        </button>
                    ))}
                </div>

                {/* Content Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl">

                    {loading ? (
                        <div className="p-6 text-slate-300">Loading registrations...</div>
                    ) : data.length === 0 ? (
                        <div className="p-6 text-slate-400">
                            No registrations found for this session.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-white/5 text-slate-300">
                                    <tr>
                                        <th className="p-4 text-left font-medium">Name</th>
                                        <th className="p-4 text-left font-medium">Email</th>
                                        <th className="p-4 text-left font-medium">Organization</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-white/10 hover:bg-white/5 transition"
                                        >
                                            <td className="p-4">{item.name}</td>
                                            <td className="p-4 text-slate-300">{item.email}</td>
                                            <td className="p-4 text-slate-300">
                                                {item.organization}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}