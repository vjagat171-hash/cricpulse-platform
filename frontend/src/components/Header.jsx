import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../data/mockData";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/15 text-lg font-bold text-emerald-300">
            CP
          </div>
          <div>
            <p className="text-lg font-semibold text-white">CricPulse</p>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Live batting hub</p>
          </div>
        </Link>

        <nav className="hidden gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? "bg-emerald-400 text-slate-950"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
