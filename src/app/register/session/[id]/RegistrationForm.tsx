'use client';

import { addRegistration } from '@/firebase/api';
import { useState, ChangeEvent, FormEvent } from 'react';

export default function RegisterForm({ sessionId }: { sessionId: string }) {

    const [status, setStatus] = useState<"success" | "error" | "loading" | null>(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        organization: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!sessionId) {
            setStatus("error");
            return;
        }

        try {
            setStatus("loading");

            await addRegistration({
                ...form,
                sessionId
            });

            setStatus("success");

            setForm({
                name: "",
                email: "",
                organization: ""
            });

        } catch (error) {
            console.error("Error registering user", error);
            setStatus("error");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-8 bg-[#030712]">

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md p-8 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-xl relative z-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Session Registration
                    </h1>
                    <p className="text-cyan-400 font-medium">
                        Session ID: {sessionId}
                    </p>
                </div>

                <p className="text-slate-400 mb-8">
                    Please enter your details below to register for this session.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-500/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-500/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                            Organization
                        </label>
                        <input
                            type="text"
                            name="organization"
                            value={form.organization}
                            onChange={handleChange}
                            placeholder="Company / Institute"
                            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-500/50 transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-all disabled:opacity-50"
                        >
                            {status === "loading" ? "Registering..." : "Register for Session"}
                        </button>

                        {status === "success" && (
                            <p className="text-green-400 text-sm text-center mt-2">
                                Registration successful!
                            </p>
                        )}

                        {status === "error" && (
                            <p className="text-red-400 text-sm text-center mt-2">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </div>
                </form>

                <p className="mt-8 text-xs text-slate-600 text-center">
                    Note: This is a delegate registration form. Authentication is not required.
                </p>

            </div>
        </div>
    );
}