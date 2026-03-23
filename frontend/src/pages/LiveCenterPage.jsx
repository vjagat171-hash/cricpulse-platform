import useLiveMatch from "../hooks/useLiveMatch";
import LiveScoreCard from "../components/LiveScoreCard";
import BattingPanel from "../components/BattingPanel";
import RecentOvers from "../components/RecentOvers";

export default function LiveCenterPage() {
  const { match, matches, loading } = useLiveMatch();

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-10 text-center text-slate-300">
        Loading live match center...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LiveScoreCard match={match} />
      <BattingPanel match={match} />
      <RecentOvers overs={match?.recentOvers || []} />

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
        <h3 className="text-xl font-bold text-white">Other live matches</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {matches.map((item) => (
            <div key={item.id} className="rounded-2xl bg-slate-800 p-4">
              <p className="text-sm text-emerald-400">{item.status}</p>
              <h4 className="mt-2 text-lg font-semibold text-white">{item.name}</h4>
              <p className="mt-1 text-sm text-slate-400">{item.venue}</p>
              <p className="mt-3 text-slate-200">{item.teamA}: {item.scoreA}</p>
              <p className="text-slate-200">{item.teamB}: {item.scoreB}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
