import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/", group: "core" },
  { label: "Live", path: "/live", group: "core", badge: "Now" },
  { label: "Live Center", path: "/live-center", group: "core" },
  { label: "Matches", path: "/live-matches", group: "core" },
  { label: "Schedule", path: "/schedule", group: "core" },
  { label: "Teams", path: "/teams", group: "explore" },
  { label: "Players", path: "/players", group: "explore" },
  { label: "Series", path: "/series", group: "explore" },
  { label: "Points", path: "/points-table", group: "explore" },
  { label: "News", path: "/news", group: "explore" },
  { label: "Search", path: "/search", group: "tools" },
];

function LogoBlock() {
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-3">
      <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-emerald-400 text-sm font-black text-slate-950 shadow-[0_12px_30px_rgba(16,185,129,0.28)] transition group-hover:scale-[1.03]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_45%)]" />
        <span className="relative">CP</span>
      </div>

      <div className="min-w-0">
        <p className="truncate text-lg font-black tracking-tight text-white">CricPulse</p>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.75)]" />
          <p className="truncate text-[11px] uppercase tracking-[0.26em] text-slate-400">Managed Live Cricket Hub</p>
        </div>
      </div>
    </Link>
  );
}

function PillLink({ item, mobile = false, onClick }) {
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        [
          mobile
            ? "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition"
            : "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
          isActive
            ? "bg-emerald-400 text-slate-950 shadow-[0_8px_24px_rgba(16,185,129,0.2)]"
            : mobile
            ? "bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
            : "border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span>{item.label}</span>
          {item.badge ? (
            <span
              className={[
                "rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em]",
                isActive ? "bg-slate-950/10 text-slate-950" : "bg-emerald-400/10 text-emerald-300",
              ].join(" ")}
            >
              {item.badge}
            </span>
          ) : null}
        </>
      )}
    </NavLink>
  );
}

function TopUtilityBar() {
  return (
    <div className="hidden border-b border-white/5 bg-slate-950/70 lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-slate-500 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1 text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live Match Tracking
          </span>
          <span className="hidden xl:inline">Responsive Match Navigation</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/news" className="transition hover:text-white">Latest News</Link>
          <span className="text-white/10">/</span>
          <Link to="/points-table" className="transition hover:text-white">Points Table</Link>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopExpanded, setDesktopExpanded] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const coreLinks = useMemo(() => navLinks.filter((item) => item.group === "core"), []);
  const exploreLinks = useMemo(() => navLinks.filter((item) => item.group === "explore"), []);
  const toolLinks = useMemo(() => navLinks.filter((item) => item.group === "tools"), []);

  const desktopLinks = desktopExpanded ? [...coreLinks, ...exploreLinks] : [...coreLinks, ...exploreLinks.slice(0, 2)];
  const hiddenCount = Math.max(exploreLinks.length - 2, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl">
      <TopUtilityBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-3 lg:gap-4">
          <LogoBlock />

          <div className="hidden min-w-0 flex-1 xl:flex xl:justify-center">
            <div className="flex max-w-4xl flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 shadow-[0_10px_35px_rgba(2,6,23,0.35)]">
              {desktopLinks.map((item) => (
                <PillLink key={item.path} item={item} />
              ))}

              {hiddenCount > 0 ? (
                <button
                  type="button"
                  onClick={() => setDesktopExpanded((prev) => !prev)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  {desktopExpanded ? "Less" : `More ${hiddenCount}`}
                </button>
              ) : null}
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/search"
              className="group hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white lg:inline-flex"
            >
              <span className="text-slate-500 group-hover:text-slate-300">⌕</span>
              Quick Search
            </Link>

            <Link
              to="/live"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:scale-[1.02] hover:brightness-105"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
              Watch Live Flow
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 xl:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span className="text-xl">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        <div className="hidden border-t border-white/10 py-3 md:block xl:hidden">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[...coreLinks, ...exploreLinks, ...toolLinks].map((item) => (
              <div key={item.path} className="shrink-0">
                <PillLink item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.98),rgba(2,6,23,0.94))] xl:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="mb-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-white">Managed Navigation</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Fast routes for live, teams, players, and tournament pages</p>
                </div>
                <Link
                  to="/live-center"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-slate-950"
                >
                  Open Live Center
                </Link>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  to="/search"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-center text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  Search Anything
                </Link>
                <Link
                  to="/live"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl bg-emerald-400 px-4 py-3 text-center text-sm font-black text-slate-950 transition hover:brightness-105"
                >
                  Watch Live Flow
                </Link>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">Core</p>
                <div className="grid gap-2">
                  {coreLinks.map((item) => (
                    <PillLink key={item.path} item={item} onClick={() => setMobileOpen(false)} mobile />
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">Explore</p>
                <div className="grid gap-2">
                  {exploreLinks.map((item) => (
                    <PillLink key={item.path} item={item} onClick={() => setMobileOpen(false)} mobile />
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-violet-400">Tools</p>
                <div className="grid gap-2">
                  {toolLinks.map((item) => (
                    <PillLink key={item.path} item={item} onClick={() => setMobileOpen(false)} mobile />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
