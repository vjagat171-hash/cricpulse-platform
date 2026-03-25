export default function RecentOvers({ overs = [] }) {
  const safeOvers = Array.isArray(overs) ? overs : [];

  return (
    <section className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Momentum</p>
          <h3 className="mt-1 text-2xl font-black text-white">Recent overs</h3>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {safeOvers.length ? (
          safeOvers.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/5 bg-slate-950/70 px-4 py-4 text-sm font-medium text-slate-200"
            >
              Over {index + 1}: {item || "-"}
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/60 px-4 py-5 text-sm text-slate-500 sm:col-span-2 xl:col-span-3">
            No recent overs data available.
          </div>
        )}
      </div>
    </section>
  );
}
