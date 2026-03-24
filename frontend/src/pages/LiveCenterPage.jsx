import useLiveMatch from "../hooks/useLiveMatch";
import LiveScoreCard from "../components/LiveScoreCard";
import BattingPanel from "../components/BattingPanel";
import RecentOvers from "../components/RecentOvers";

export default function LiveCenterPage() {
  const { match, matches, loading, error } = useLiveMatch();

  if (loading) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-10 text-center text-slate-300 shadow-xl">
        Loading live center...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      ) : null}

      <LiveScoreCard match={match} />
      <BattingPanel match={match} />
      <RecentOvers overs={match?.recentOvers || []} />

      <section className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Live board</p>
            <h3 className="mt-1 text-2xl font-black text-white">Other live matches</h3>
          </div>
          <p className="text-sm text-slate-400">Realtime cards update from the same API layer.</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {matches.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/5 bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-400">{item.status}</p>
              <h4 className="mt-2 text-lg font-bold text-white">{item.name}</h4>
              <p className="mt-1 text-sm text-slate-400">{item.venue}</p>
              <p className="mt-4 text-sm text-slate-200">{item.teamA}: {item.scoreA || item.score}</p>
              <p className="mt-1 text-sm text-slate-200">{item.teamB}: {item.scoreB}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
