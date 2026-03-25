export default function PlayerStatsCard({ player }) {
  if (!player) return null;

  return (
    <article className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-400">{player.role}</p>
          <h3 className="mt-2 text-2xl font-black text-white">{player.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{player.team}</p>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/10 text-lg font-black text-emerald-300">
          {player.short || player.name?.slice(0, 2)?.toUpperCase()}
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-950/70 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-500">Runs</p><p className="mt-2 text-xl font-black text-white">{player.runs}</p></div>
        <div className="rounded-2xl bg-slate-950/70 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-500">Avg</p><p className="mt-2 text-xl font-black text-white">{player.average}</p></div>
        <div className="rounded-2xl bg-slate-950/70 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-500">SR</p><p className="mt-2 text-xl font-black text-white">{player.strikeRate}</p></div>
      </div>
    </article>
  );
}
