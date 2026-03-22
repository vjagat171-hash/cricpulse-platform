export default function MatchHero({ match }) {
  if (!match) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-slate-300">
        Match data loading...
      </div>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/70 p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-rose-300">
              {match.status}
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              {match.battingTeam} vs {match.bowlingTeam}
            </h1>
            <p className="mt-2 text-sm text-slate-400">{match.venue}</p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-4 text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Live score</p>
            <p className="mt-2 text-4xl font-bold text-white">{match.score}</p>
            <p className="mt-1 text-sm text-slate-300">Overs {match.overs}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Required</p>
            <p className="mt-2 text-white">{match.required}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Partnership</p>
            <p className="mt-2 text-white">{match.partnership}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Striker</p>
            <p className="mt-2 text-white">
              {match.striker.name} {match.striker.runs}({match.striker.balls})
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Bowler</p>
            <p className="mt-2 text-white">
              {match.bowler.name} {match.bowler.overs}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Live batting matchup</h2>

        <div className="mt-5 space-y-4 text-sm text-slate-300">
          <div className="rounded-2xl bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Striker</p>
            <p className="mt-2 text-lg font-semibold text-white">{match.striker.name}</p>
            <p>
              {match.striker.runs} runs · {match.striker.balls} balls · SR {match.striker.sr}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Non-striker</p>
            <p className="mt-2 text-lg font-semibold text-white">{match.nonStriker.name}</p>
            <p>
              {match.nonStriker.runs} runs · {match.nonStriker.balls} balls · SR {match.nonStriker.sr}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Current bowler</p>
            <p className="mt-2 text-lg font-semibold text-white">{match.bowler.name}</p>
            <p>
              {match.bowler.overs} overs · {match.bowler.runs} runs · {match.bowler.wickets} wicket
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
