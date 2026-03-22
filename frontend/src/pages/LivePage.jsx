import MatchHero from "../components/MatchHero";
import SectionHeader from "../components/SectionHeader";
import LiveVideo from "../components/LiveVideo";

export default function LivePage({ match, loading }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Live batting"
        title="Dedicated live match center"
        description="Scoreboard, batter-vs-bowler detail, recent overs, and win pressure ek hi page me."
      />

      <LiveVideo embedUrl={match?.embedUrl} title={`${match?.battingTeam || match?.teamA || "Match"} live stream`} />

      {loading ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-300">
          Loading live scoreboard...
        </div>
      ) : (
        <MatchHero match={match} />
      )}

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Recent overs</h3>
            <span className="text-sm text-slate-400">Pressure tracking</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {match?.recentOvers && match.recentOvers.length > 0 ? (
              match.recentOvers.map((item, index) => (
                <div key={index} className="rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300">
                  {item}
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-400">
                No recent overs available
              </div>
            )}
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-300">Partnership</h4>
            <p className="mt-2 text-sm text-slate-400">{match?.partnership || "—"}</p>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-300">Required</h4>
            <p className="mt-2 text-sm text-slate-400">{match?.required || "—"}</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Win probability</h3>

          <div className="mt-5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
              style={{ width: `${match?.winProbability?.batting ?? 0}%` }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
            <span>Batting: {match?.winProbability?.batting ?? 0}%</span>
            <span>Bowling: {match?.winProbability?.bowling ?? 0}%</span>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-300">Current bowler</h4>
            <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
              <span>{match?.bowler?.name || "—"}</span>
              <span>{match?.bowler?.overs || "0.0"} • {match?.bowler?.wickets ?? 0} wkts</span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-300">Striker</h4>
            <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
              <span>{match?.striker?.name || "—"}</span>
              <span>{match?.striker ? `${match.striker.runs} (${match.striker.balls}) • SR ${match.striker.sr}` : "—"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
