export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-slate-500">Welcome to the admin panel.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <a 
          href="/admin/task-tracking"
          className="p-6 border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Task Tracking</h2>
          <p className="text-slate-500 text-sm">Manage team tasks and export to Excel.</p>
        </a>
        <a 
          href="/admin/email-tool"
          className="p-6 border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Email Tool</h2>
          <p className="text-slate-500 text-sm">Send and manage emails.</p>
        </a>
      </div>
    </div>
  );
}
