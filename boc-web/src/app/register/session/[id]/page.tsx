import React from 'react';

/**
 * DELEGATE REGISTRATION PAGE
 * 
 * This page is used for delegate registration for specific sessions.
 * The session is identified by the dynamic route parameter [id].
 * 
 * TODO FOR TEAM MEMBERS:
 * 1. Fetch session details from Firestore using params.id
 * 2. Implement delegate registration logic (save to 'delegates' collection)
 * 3. Add validation for session availability
 */

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-[#030712]">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md p-8 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-xl relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Session Registration</h1>
          <p className="text-cyan-400 font-medium">Session ID: {id}</p>
        </div>

        <p className="text-slate-400 mb-8">
          Please enter your details below to register for this session.
        </p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Organization</label>
            <input 
              type="text" 
              placeholder="Company / Institute" 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>

          <div className="pt-4">
            <button 
              type="button"
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              Register for Session
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs text-slate-600 text-center">
          Note: This is a delegate registration form. Authentication is not required.
        </p>
      </div>
    </div>
  );
}
