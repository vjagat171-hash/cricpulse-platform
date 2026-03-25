import { Link } from "react-router-dom";

const footerLinks = {
  platform: [
    { label: "Home", path: "/" },
    { label: "Live", path: "/live" },
    { label: "Live Center", path: "/live-center" },
    { label: "Live Matches", path: "/live-matches" },
  ],
  explore: [
    { label: "Schedule", path: "/schedule" },
    { label: "Teams", path: "/teams" },
    { label: "Players", path: "/players" },
    { label: "Series", path: "/series" },
  ],
  insights: [
    { label: "Points Table", path: "/points-table" },
    { label: "News", path: "/news" },
    { label: "Search", path: "/search" },
  ],
};

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block text-sm text-slate-400 transition hover:text-emerald-300"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20">
              CP
            </div>
            <div>
              <p className="text-xl font-black tracking-tight text-white">CricPulse</p>
              <p className="text-[11px] uppercase tracking-[0.26em] text-slate-400">Advanced Cricket Platform</p>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Follow live cricket scores, recent overs, player momentum, schedules, points table, search, and match detail pages in one responsive experience.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/live"
              className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
            >
              Open Live
            </Link>
            <Link
              to="/search"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Search Platform
            </Link>
          </div>
        </div>

        <FooterColumn title="Platform" items={footerLinks.platform} />
        <FooterColumn title="Explore" items={footerLinks.explore} />
        <FooterColumn title="Insights" items={footerLinks.insights} />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 CricPulse. Built for responsive live cricket experiences.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/series" className="transition hover:text-emerald-300">Series</Link>
            <Link to="/players" className="transition hover:text-emerald-300">Players</Link>
            <Link to="/points-table" className="transition hover:text-emerald-300">Points Table</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
