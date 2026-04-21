import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-[100svh] items-center justify-center bg-[#050812] px-6 text-white">
      <div className="max-w-xl text-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">Test Project Ready</h1>
        <p className="mb-8 text-white/70">Open the Linux environment test page below.</p>
        <Link
          href="/tets"
          className="inline-flex rounded-xl border border-cyan-300/40 bg-cyan-500/20 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-500/30"
        >
          Open /tets
        </Link>
      </div>
    </main>
  );
}
