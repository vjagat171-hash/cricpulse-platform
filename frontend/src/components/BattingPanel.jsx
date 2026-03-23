export default function BattingPanel({ match }) {
  const striker = match?.striker;
  const nonStriker = match?.nonStriker;
  const bowler = match?.bowler;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Striker</p>
        <h3 className="mt-2 text-xl font-bold">{striker?.name || "N/A"}</h3>
        <p className="mt-2 text-slate-300">
          {striker ? `${striker.runs} (${striker.balls}) · SR ${striker.sr}` : "Data unavailable"}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Non-striker</p>
        <h3 className="mt-2 text-xl font-bold">{nonStriker?.name || "N/A"}</h3>
        <p className="mt-2 text-slate-300">
          {nonStriker ? `${nonStriker.runs} (${nonStriker.balls}) · SR ${nonStriker.sr}` : "Data unavailable"}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Current bowler</p>
        <h3 className="mt-2 text-xl font-bold">{bowler?.name || "N/A"}</h3>
        <p className="mt-2 text-slate-300">
          {bowler ? `${bowler.overs} overs · ${bowler.runs} runs · ${bowler.wickets} wkts` : "Data unavailable"}
        </p>
      </div>
    </div>
  );
}
