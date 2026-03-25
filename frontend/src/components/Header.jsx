import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Live", path: "/live" },
  { label: "Live Center", path: "/live-center" },
  { label: "Matches", path: "/live-matches" },
  { label: "Schedule", path: "/schedule" },
  { label: "Teams", path: "/teams" },
  { label: "Players", path: "/players" },
  { label: "Series", path: "/series" },
  { label: "Points", path: "/points-table" },
  { label: "News", path: "/news" },
  { label: "Search", path: "/search" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20">
            CP
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-white">CricPulse</p>
            <p className="text-[11px] uppercase tracking-[0.26em] text-slate-400">Live Cricket Hub</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 xl:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-emerald-400 text-slate-950"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/search"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            Quick Search
          </Link>
          <Link
            to="/live"
            className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
          >
            Watch Live Flow
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white xl:hidden"
          aria-label="Toggle navigation"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 xl:hidden">
          <div className="grid gap-2 sm:grid-cols-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    isActive
                      ? "bg-emerald-400 text-slate-950"
                      : "bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              to="/search"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-slate-200"
            >
              Search Anything
            </Link>
            <Link
              to="/live"
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-emerald-400 px-4 py-3 text-center text-sm font-black text-slate-950"
            >
              Open Live Flow
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
