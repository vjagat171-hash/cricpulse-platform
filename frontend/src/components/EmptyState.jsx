export default function EmptyState({ title = "No data", text = "Nothing to show right now." }) {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-900/70 p-10 text-center text-slate-400">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{text}</p>
    </div>
  );
}
