import { Link } from "react-router-dom";

const footerGroups = [
  {
    title: "Platform",
    links: [
      { label: "Home", path: "/" },
      { label: "Live Center", path: "/live-center" },
      { label: "Live Matches", path: "/live-matches" },
      { label: "Schedule", path: "/schedule" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Teams", path: "/teams" },
      { label: "Players", path: "/players" },
      { label: "Series", path: "/series" },
      { label: "Points Table", path: "/points-table" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "News", path: "/news" },
      { label: "Search", path: "/search" },
      { label: "Contact Desk", path: "/contact" },
      { label: "About Platform", path: "/about" },
    ],
  },
];

const quickStats = [
  { label: "Live routes", value: "04" },
  { label: "Explore hubs", value: "03" },
  { label: "Insight blocks", value: "03" },
];

function BrandBlock() {
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-3">
      <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[20px] bg-gradient-to-br from-emerald-300 via-emerald-400 to-cyan-400 text-base font-black text-slate-950 shadow-[0_18px_38px_rgba(16,185,129,0.28)] transition duration-300 group-hover:scale-[1.04] group-hover:rotate-[-4deg]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_42%)]" />
        <span className="relative">CP</span>
      </div>
      <div className="min-w-0">
        <p className="truncate text-xl font-black tracking-tight text-white">CricPulse</p>
        <p className="truncate text-[11px] uppercase tracking-[0.28em] text-slate-400">Managed Match Footer</p>
      </div>
    </Link>
  );
}

function FooterLinkGroup({ group }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400">{group.title}</p>
      <div className="mt-4 grid gap-2">
        {group.links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-10 px-2 pb-2 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/85 shadow-[0_24px_80px_rgba(2,6,23,0.42)] backdrop-blur-2xl">
        <div className="border-b border-white/5 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_24%)]">
          <div className="flex flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Managed Footer Layer
              </span>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Built for faster cricket discovery, live tracking, and cleaner navigation.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Keep the same premium header vibe all the way to the bottom with grouped routes, quick shortcuts, and a stronger brand close.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {quickStats.map((item) => (
                <div key={item.label} className="rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-4 text-center">
                  <p className="text-2xl font-black text-white">{item.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[1.15fr_1fr_1fr_1fr] lg:px-8">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,185,129,0.10),rgba(255,255,255,0.03))] p-6">
            <BrandBlock />
            <p className="mt-5 text-sm leading-7 text-slate-300">
              CricPulse ko isi managed mega-menu style ke saath footer me extend kiya gaya hai, taaki poori site ek hi premium system jaisi feel de.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/live"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02] hover:brightness-105"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
                Open Live Flow
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                <span className="text-slate-500">⌕</span>
                Search Routes
              </Link>
            </div>
          </div>

          {footerGroups.map((group) => (
            <FooterLinkGroup key={group.title} group={group} />
          ))}
        </div>

        <div className="border-t border-white/10 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© 2026 CricPulse. Premium cricket interface with managed navigation and branded footer system.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/about" className="transition hover:text-white">About</Link>
              <span className="text-white/10">/</span>
              <Link to="/contact" className="transition hover:text-white">Contact</Link>
              <span className="text-white/10">/</span>
              <Link to="/news" className="transition hover:text-white">Newsroom</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
