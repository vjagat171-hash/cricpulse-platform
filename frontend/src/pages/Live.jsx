import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const liveMatches = [
  {
    id: 1,
    teams: "Mumbai Indians vs Chennai Super Kings",
    status: "Live",
    overs: "18.4 overs",
    score: "168/4",
    detail: "Need 24 runs in 8 balls",
    runRate: "CRR 9.13",
    pressure: "High pressure",
  },
  {
    id: 2,
    teams: "India vs Australia",
    status: "Upcoming",
    overs: "Starts 7:30 PM",
    score: "Pre Match",
    detail: "Pitch report and probable XI are ready",
    runRate: "Preview ready",
    pressure: "Prime clash",
  },
  {
    id: 3,
    teams: "RCB vs KKR",
    status: "Completed",
    overs: "Result",
    score: "RCB won by 6 wickets",
    detail: "Strong chase with finish in final over phase",
    runRate: "Highlights ready",
    pressure: "Closed",
  },
  {
    id: 4,
    teams: "Delhi Capitals vs Rajasthan Royals",
    status: "Live",
    overs: "12.2 overs",
    score: "104/3",
    detail: "Middle overs rebuilding phase",
    runRate: "CRR 8.43",
    pressure: "Balanced",
  },
];

const filterTabs = ["All", "Live", "Upcoming", "Completed"];

const statCards = [
  { label: "Active boards", value: "04" },
  { label: "Live pressure zones", value: "02" },
  { label: "Quick shortcuts", value: "06" },
];

const insightCards = [
  {
    title: "Fast scoreboard reading",
    text: "Important match signals are separated into score, overs, detail, and pressure so the page stays readable.",
  },
  {
    title: "Cleaner decision flow",
    text: "Use one surface to move into live center, schedule, points table, or route search without extra clicks.",
  },
  {
    title: "API-ready layout",
    text: "Cards are mapped from arrays, so you can later connect a live cricket API with minimal structural change.",
  },
];

function statusClasses(status) {
  if (status === "Live") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  if (status === "Upcoming") return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
  return "border-white/10 bg-white/5 text-slate-300";
}

export default function Live() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeMatchId, setActiveMatchId] = useState(1);

  const filteredMatches = useMemo(() => {
    if (activeFilter === "All") return liveMatches;
    return liveMatches.filter((match) => match.status === activeFilter);
  }, [activeFilter]);

  const activeMatch = useMemo(() => {
    const found = liveMatches.find((match) => match.id === activeMatchId);
    return found || liveMatches[0];
  }, [activeMatchId]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-2 sm:px-4 lg:gap-8">
      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live Match Console
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Follow live cricket action with clearer signals and faster route access.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            This page is built as a focused live dashboard with feature cards, status filters, and a stronger featured scoreboard area.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/live-center"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02] hover:brightness-105"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
              Open Live Center
            </Link>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              View Schedule
            </Link>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {statCards.map((item) => (
              <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-950/72 p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400">Featured board</p>
              <h2 className="mt-2 text-2xl font-black text-white">{activeMatch.teams}</h2>
            </div>
            <span
              className={[
                "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]",
                statusClasses(activeMatch.status),
              ].join(" ")}
            >
              {activeMatch.status}
            </span>
          </div>

          <div className="mt-5 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{activeMatch.overs}</p>
            <p className="mt-3 text-4xl font-black tracking-tight text-white">{activeMatch.score}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{activeMatch.detail}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-300">
                {activeMatch.runRate}
              </span>
              <span className="rounded-full border border-emerald-400/10 bg-emerald-400/5 px-4 py-2 text-xs font-semibold text-emerald-300">
                {activeMatch.pressure}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/live-center"
                className="inline-flex rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
              >
                Deep Match View
              </Link>
              <Link
                to="/points-table"
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                Table Check
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-slate-950/72 p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400">Live filters</p>
            <h2 className="mt-2 text-2xl font-black text-white">Track matches by current state.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={[
                  "rounded-full px-4 py-2.5 text-sm font-semibold transition",
                  activeFilter === tab
                    ? "bg-emerald-400 text-slate-950"
                    : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {filteredMatches.map((match) => (
            <button
              key={match.id}
              type="button"
              onClick={() => setActiveMatchId(match.id)}
              className={[
                "rounded-[26px] border p-5 text-left transition",
                activeMatchId === match.id
                  ? "border-emerald-400/30 bg-emerald-400/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-black text-white">{match.teams}</p>
                  <p className="mt-2 text-sm text-slate-400">{match.overs}</p>
                </div>
                <span
                  className={[
                    "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]",
                    statusClasses(match.status),
                  ].join(" ")}
                >
                  {match.status}
                </span>
              </div>
              <p className="mt-4 text-3xl font-black tracking-tight text-white">{match.score}</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">{match.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-slate-950/55 px-3 py-2 text-xs font-semibold text-slate-300">
                  {match.runRate}
                </span>
                <span className="rounded-full border border-white/10 bg-slate-950/55 px-3 py-2 text-xs font-semibold text-slate-300">
                  {match.pressure}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(59,130,246,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">Live actions</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Link to="/live-center" className="rounded-[24px] border border-white/10 bg-slate-950/55 p-4 transition hover:border-white/15 hover:bg-white/[0.05]">
              <p className="text-base font-black text-white">Live Center</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">Open richer score flow and quick tools.</p>
            </Link>
            <Link to="/news" className="rounded-[24px] border border-white/10 bg-slate-950/55 p-4 transition hover:border-white/15 hover:bg-white/[0.05]">
              <p className="text-base font-black text-white">Newsroom</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">Check fast stories around current games.</p>
            </Link>
            <Link to="/search" className="rounded-[24px] border border-white/10 bg-slate-950/55 p-4 transition hover:border-white/15 hover:bg-white/[0.05]">
              <p className="text-base font-black text-white">Search Hub</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">Jump quickly to teams, players, and series.</p>
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-950/72 p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400">Page design logic</p>
          <div className="mt-5 grid gap-3">
            {insightCards.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-base font-black text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
