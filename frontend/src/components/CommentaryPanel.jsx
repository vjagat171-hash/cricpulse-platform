export default function CommentaryPanel({ items = [] }) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Commentary</p>
      <h3 className="mt-1 text-2xl font-black text-white">Ball by ball feed</h3>
      <div className="mt-5 space-y-3">
        {safeItems.length ? safeItems.map((item) => (
          <div key={item.id} className="rounded-2xl bg-slate-950/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">{item.over}</p>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{item.result}</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{item.text}</p>
          </div>
        )) : <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/60 p-4 text-sm text-slate-500">No commentary available.</div>}
      </div>
    </section>
  );
}
