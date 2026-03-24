function StatBlock({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-950/70 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

export default function BattingPanel({ match }) {
  const striker = match?.striker;
  const nonStriker = match?.nonStriker;
  const bowler = match?.bowler;

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Striker</p>
        <h3 className="mt-2 text-2xl font-black text-white">{striker?.name || "N/A"}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <StatBlock label="Runs" value={striker?.runs ?? "-"} />
          <StatBlock label="Balls" value={striker?.balls ?? "-"} />
          <StatBlock label="SR" value={striker?.sr ?? "-"} />
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">Non-striker</p>
        <h3 className="mt-2 text-2xl font-black text-white">{nonStriker?.name || "N/A"}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <StatBlock label="Runs" value={nonStriker?.runs ?? "-"} />
          <StatBlock label="Balls" value={nonStriker?.balls ?? "-"} />
          <StatBlock label="SR" value={nonStriker?.sr ?? "-"} />
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Current bowler</p>
        <h3 className="mt-2 text-2xl font-black text-white">{bowler?.name || "N/A"}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <StatBlock label="Overs" value={bowler?.overs ?? "-"} />
          <StatBlock label="Runs" value={bowler?.runs ?? "-"} />
          <StatBlock label="Wkts" value={bowler?.wickets ?? "-"} />
        </div>
      </div>
    </section>
  );
}
