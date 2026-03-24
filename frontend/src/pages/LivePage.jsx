import { useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import LiveVideo from "../components/LiveVideo";

const tabs = ["Summary", "Batting", "Bowling", "Pressure", "Stats"];

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-950/60 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

export default function LivePage({ match, loading }) {
  const [activeTab, setActiveTab] = useState("Summary");

  const summaryStats = useMemo(
    () => [
      { label: "Overs", value: match?.overs || "Live" },
      { label: "Required", value: match?.required || "Match in progress" },
      { label: "Partnership", value: match?.partnership || "N/A" },
      { label: "Last ball", value: match?.lastBall || "Live" },
    ],
    [match]
  );

  const winBatting = match?.winProbability?.batting ?? 50;
  const winBowling = match?.winProbability?.bowling ?? 50;

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Live batting"
        title="Live match center"
        description="Scoreboard, batter-vs-bowler detail, recent overs, and win pressure ek hi page me."
      />

      <LiveVideo embedUrl={match?.embedUrl} title={`${match?.teamA || "Match"} live stream`} />

      <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-xl sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">{match?.status || "Live"}</p>
            <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
              {match?.name || `${match?.teamA || "Team A"} vs ${match?.teamB || "Team B"}`}
            </h1>
            <p className="mt-2 text-sm text-slate-400">{match?.venue || "Venue TBA"}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-950/60 px-4 py-4 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-400">{match?.teamA || "Team A"}</p>
              <h2 className="mt-2 text-2xl font-black text-white">{match?.scoreA || match?.score || "0/0"}</h2>
            </div>
            <div className="rounded-2xl bg-slate-950/60 px-4 py-4 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-400">{match?.teamB || "Team B"}</p>
              <h2 className="mt-2 text-2xl font-black text-white">{match?.scoreB || "Yet to bat"}</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-4 shadow-xl sm:p-5">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={[
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                activeTab === tab
                  ? "bg-emerald-400 text-slate-950"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-10 text-center text-slate-300 shadow-xl">
          Loading live scoreboard...
        </div>
      ) : null}

      {activeTab === "Summary" ? (
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-xl sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Match summary</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {summaryStats.map((item) => (
                <MiniStat key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-xl sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Recent overs</p>
            <div className="mt-5 grid gap-3">
              {(match?.recentOvers || []).map((item, index) => (
                <div key={index} className="rounded-2xl border border-white/5 bg-slate-950/60 px-4 py-4 text-sm text-slate-200">
                  Over {index + 1}: {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "Batting" ? (
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-xl sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Striker</p>
            <h3 className="mt-2 text-2xl font-black text-white">{match?.striker?.name || "N/A"}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MiniStat label="Runs" value={match?.striker?.runs ?? "-"} />
              <MiniStat label="Balls" value={match?.striker?.balls ?? "-"} />
              <MiniStat label="SR" value={match?.striker?.sr ?? "-"} />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-xl sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">Non-striker</p>
            <h3 className="mt-2 text-2xl font-black text-white">{match?.nonStriker?.name || "N/A"}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MiniStat label="Runs" value={match?.nonStriker?.runs ?? "-"} />
              <MiniStat label="Balls" value={match?.nonStriker?.balls ?? "-"} />
              <MiniStat label="SR" value={match?.nonStriker?.sr ?? "-"} />
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "Bowling" ? (
        <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-xl sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Current bowler</p>
          <h3 className="mt-2 text-2xl font-black text-white">{match?.bowler?.name || "N/A"}</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MiniStat label="Overs" value={match?.bowler?.overs ?? "-"} />
            <MiniStat label="Runs" value={match?.bowler?.runs ?? "-"} />
            <MiniStat label="Wickets" value={match?.bowler?.wickets ?? "-"} />
          </div>
        </section>
      ) : null}

      {activeTab === "Pressure" ? (
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-xl sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Batting win pressure</p>
            <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${winBatting}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-300">Batting side win chance: {winBatting}%</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-xl sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Bowling win pressure</p>
            <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${winBowling}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-300">Bowling side win chance: {winBowling}%</p>
          </div>
        </section>
      ) : null}

      {activeTab === "Stats" ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MiniStat label="Venue" value={match?.venue || "TBA"} />
          <MiniStat label="Batting team" value={match?.battingTeam || match?.teamA || "N/A"} />
          <MiniStat label="Bowling team" value={match?.bowlingTeam || match?.teamB || "N/A"} />
          <MiniStat label="Status" value={match?.status || "Live"} />
        </section>
      ) : null}
    </div>
  );
}
