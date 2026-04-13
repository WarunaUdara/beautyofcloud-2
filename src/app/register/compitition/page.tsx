import React from 'react';

/**
 * COMPETITION REGISTRATION PAGE
 * 
 * This page is used for delegate registration specifically for the competition.
 */

export default function CompetitionRegistrationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-[#030712]">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md p-8 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-xl relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 underline decoration-indigo-500 underline-offset-8">Competition</h1>
          <p className="text-indigo-400 font-medium">Delegate Registration</p>
        </div>

        <p className="text-slate-400 mb-8">
          Register now to participate in the upcoming competition.
        </p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Participant Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-indigo-500/50 transition-all font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-indigo-500/50 transition-all font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Team Name (Optional)</label>
            <input 
              type="text" 
              placeholder="The Cloud Hackers" 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-indigo-500/50 transition-all font-medium"
            />
          </div>

          <div className="pt-4">
            <button 
              type="button"
              className="w-full bg-indigo-500 text-white font-bold py-4 rounded-xl hover:bg-indigo-400 transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)]"
            >
              Sign Up for Competition
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs text-slate-600 text-center">
          Note: This form is specifically for competition entries.
        </p>
      </div>
    </div>
  );
}
