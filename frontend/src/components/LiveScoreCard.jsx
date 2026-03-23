export default function LiveScoreCard({ match }) {
  if (!match) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-emerald-400">{match.status}</p>
          <h2 className="text-2xl font-bold text-white">{match.name}</h2>
          <p className="text-sm text-slate-400">{match.venue}</p>
        </div>
        <div className="rounded-2xl bg-slate-800 px-4 py-3 text-sm text-slate-200">
          Source: {match.source || "live"}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-800 p-4">
          <p className="text-sm text-sky-400">{match.teamA}</p>
          <h3 className="mt-2 text-3xl font-black">{match.scoreA}</h3>
        </div>
        <div className="rounded-2xl bg-slate-800 p-4">
          <p className="text-sm text-amber-400">{match.teamB}</p>
          <h3 className="mt-2 text-3xl font-black">{match.scoreB}</h3>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-300">
        Last ball: <span className="font-bold text-white">{match.lastBall || "Live"}</span>
      </div>
    </div>
  );
}
