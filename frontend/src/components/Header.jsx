import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Live", to: "/live" },
  { label: "Live Center", to: "/live-center" },
  { label: "Live Matches", to: "/live-matches" },
  { label: "Schedule", to: "/schedule" },
  { label: "Teams", to: "/teams" },
  { label: "News", to: "/news" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-medium transition",
      isActive
        ? "bg-emerald-400 text-slate-950"
        : "text-slate-300 hover:bg-white/5 hover:text-white",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400/15 text-lg font-black text-emerald-300">
            CP
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-white">CricPulse</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Live batting hub</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 xl:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link
            to="/live-center"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Match Center
          </Link>
          <Link
            to="/live"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Watch Live Flow
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-white xl:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-sm font-semibold">Menu</span>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 xl:hidden sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navClass}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              to="/live-center"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open Match Center
            </Link>
            <Link
              to="/live-matches"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              View Live Matches
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
