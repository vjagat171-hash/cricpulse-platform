export default function LiveScoreCard({ match }) {
  if (!match) {
    return (
      <section className="rounded-[28px] border border-dashed border-white/10 bg-slate-900/70 p-10 text-center text-slate-400 shadow-xl">
        No live score available right now.
      </section>
    );
  }

  const status = match.status || "Live";
  const name = match.name || `${match.teamA || "Team A"} vs ${match.teamB || "Team B"}`;
  const venue = match.venue || "Venue TBA";
  const teamA = match.teamA || match.battingTeam || "Team A";
  const teamB = match.teamB || match.bowlingTeam || "Team B";
  const scoreA = match.scoreA || match.score || "0/0";
  const scoreB = match.scoreB || "Yet to bat";
  const battingTeam = match.battingTeam || teamA;
  const bowlingTeam = match.bowlingTeam || teamB;
  const lastBall = match.lastBall || "Live";

  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">
            {status}
          </p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
            {name}
          </h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">{venue}</p>
        </div>

        <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
          Last ball: <span className="font-bold text-white">{lastBall}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-sky-400/10 bg-slate-950/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">{teamA}</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">{scoreA}</h2>
          <p className="mt-2 text-sm text-slate-400">Batting side: {battingTeam}</p>
        </div>

        <div className="rounded-3xl border border-amber-400/10 bg-slate-950/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">{teamB}</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">{scoreB}</h2>
          <p className="mt-2 text-sm text-slate-400">Bowling side: {bowlingTeam}</p>
        </div>
      </div>
    </section>
  );
}
