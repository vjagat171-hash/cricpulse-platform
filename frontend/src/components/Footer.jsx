import { Link } from "react-router-dom";

const footerLinks = {
  Platform: [
    { label: "Home", to: "/" },
    { label: "Live", to: "/live" },
    { label: "Live Center", to: "/live-center" },
    { label: "Live Matches", to: "/live-matches" },
  ],
  Explore: [
    { label: "Schedule", to: "/schedule" },
    { label: "Teams", to: "/teams" },
    { label: "News", to: "/news" },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/95">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400/15 font-black text-emerald-300">
                CP
              </div>
              <div>
                <h3 className="text-xl font-black text-white">CricPulse</h3>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Live batting hub</p>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
              Modern cricket experience for live match tracking, batting-focused scoreboards, recent overs, team pages, and responsive sports UI.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/live-center"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Open Match Center
              </Link>
              <Link
                to="/schedule"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Schedule
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</h4>
                <div className="mt-4 flex flex-col gap-2">
                  {links.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CricPulse. Built for live cricket experiences.</p>
          <p>Responsive sports interface with live score and batting-first navigation.</p>
        </div>
      </div>
    </footer>
  );
}
