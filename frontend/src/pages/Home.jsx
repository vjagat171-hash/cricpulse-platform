import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const liveTabs = [
  {
    title: "Mumbai Indians vs Chennai Super Kings",
    meta: "Live · 18.4 overs",
    score: "168/4",
    detail: "Need 24 runs in 8 balls",
    badge: "Pressure Index 82",
  },
  {
    title: "India vs Australia",
    meta: "Upcoming · 7:30 PM",
    score: "Pre Match",
    detail: "Pitch report and probable XI ready",
    badge: "Build Watchlist",
  },
  {
    title: "RCB vs KKR",
    meta: "Completed",
    score: "RCB won by 6 wickets",
    detail: "Top batting partnership and finishers recap",
    badge: "Highlights Ready",
  },
];

const quickCards = [
  {
    title: "Live Center",
    desc: "Open the deeper live experience with momentum, scoreboard, and quick route access.",
    path: "/live-center",
    label: "Open now",
  },
  {
    title: "Points Table",
    desc: "Track standings, net run rate, and movement in one cleaner block.",
    path: "/points-table",
    label: "View table",
  },
  {
    title: "Search Hub",
    desc: "Jump to teams, players, series, and stories without digging through menus.",
    path: "/search",
    label: "Search routes",
  },
];

const spotlightCards = [
  {
    title: "Smart Match Tracking",
    text: "Structured hero blocks and compact live data cards keep the homepage fast and readable.",
  },
  {
    title: "Premium Interface",
    text: "The page uses the same dark glassmorphism direction as your header and footer for a single system feel.",
  },
  {
    title: "Scalable Sections",
    text: "Every block is data-driven, so you can later replace static arrays with live APIs easily.",
  },
];

const newsCards = [
  {
    title: "Matchday Briefing",
    text: "Short form pre-match summaries, toss notes, and player watch updates in one row.",
    tag: "Editorial",
  },
  {
    title: "Series Radar",
    text: "Track ongoing tournaments, featured clashes, and schedule jumps from the homepage itself.",
    tag: "Tournament",
  },
  {
    title: "Player Focus",
    text: "Use compact spotlight cards for top batters, bowlers, and recent impact performers.",
    tag: "Profiles",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % liveTabs.length);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const activeMatch = useMemo(() => liveTabs[activeIndex], [activeIndex]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-2 sm:px-4 lg:gap-8">
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            CricPulse Platform Watch
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Track live cricket momentum with a sharper, deeper, more responsive homepage.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            This homepage is designed to feel like a live cricket control surface, with clear action points, featured match context, and quick movement into the most important routes.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/live"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02] hover:brightness-105"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
              Open Live Flow
            </Link>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Upcoming Schedule
            </Link>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-2xl font-black text-white">24/7</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">Live routing feel</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-2xl font-black text-white">3</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">Core action lanes</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-2xl font-black text-white">1</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">Unified premium shell</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400">Featured match</p>
              <h2 className="mt-2 text-2xl font-black text-white">{activeMatch.title}</h2>
            </div>
            <span className="rounded-full border border-emerald-400/10 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
              {activeMatch.badge}
            </span>
          </div>

          <div className="mt-5 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{activeMatch.meta}</p>
            <p className="mt-3 text-4xl font-black tracking-tight text-white">{activeMatch.score}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{activeMatch.detail}</p>
            <Link
              to="/live-center"
              className="mt-5 inline-flex rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
            >
              Open Match Center
            </Link>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {liveTabs.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={[
                  "rounded-2xl border px-3 py-3 text-left transition",
                  activeIndex === index
                    ? "border-emerald-400/30 bg-emerald-400/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]",
                ].join(" ")}
              >
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-6 text-slate-400">{item.meta}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/72 p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400">Quick access</p>
              <h2 className="mt-2 text-2xl font-black text-white">Move faster across the platform.</h2>
            </div>
            <Link to="/search" className="text-sm font-semibold text-slate-300 transition hover:text-white">
              Open search
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {quickCards.map((card) => (
              <div key={card.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-black text-white">{card.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{card.desc}</p>
                  </div>
                  <Link
                    to={card.path}
                    className="inline-flex shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                  >
                    {card.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/72 p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400">Why this homepage works</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {spotlightCards.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-base font-black text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(59,130,246,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">News and stories</p>
                <h2 className="mt-2 text-2xl font-black text-white">Homepage editorial blocks</h2>
              </div>
              <Link to="/news" className="text-sm font-semibold text-slate-300 transition hover:text-white">
                Visit newsroom
              </Link>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {newsCards.map((card) => (
                <div key={card.title} className="rounded-[24px] border border-white/10 bg-slate-950/55 p-4">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
                    {card.tag}
                  </span>
                  <p className="mt-4 text-lg font-black text-white">{card.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">Next build layer</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Ready for live API binding, dynamic widgets, and deeper match modules.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
              This structure is intentionally ready for real data. Later you can connect live score APIs, featured series feeds, and personalized match cards without rebuilding the layout.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/live-center"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02] hover:brightness-105"
            >
              Launch Live Center
            </Link>
            <Link
              to="/teams"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Explore Teams
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
