export default function StatCard({ label, value, accent = false }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        accent
          ? "border-emerald-300/30 bg-emerald-400/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
