import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navigation = [
  { label: "Home", path: "/", simple: true },
  {
    label: "Live",
    path: "/live",
    badge: "Now",
    sections: [
      {
        title: "Watch",
        items: [
          { label: "Live Overview", path: "/live", desc: "Realtime score stream and featured match view" },
          { label: "Live Center", path: "/live-center", desc: "Advanced match control room and shortcuts" },
          { label: "Live Matches", path: "/live-matches", desc: "All active fixtures in one screen" },
        ],
      },
      {
        title: "Follow Next",
        items: [
          { label: "Schedule", path: "/schedule", desc: "Upcoming fixtures, times, and venues" },
        ],
      },
    ],
    featured: {
      title: "Matchday Center",
      text: "Open a richer live experience with score pressure, momentum, and fast route access.",
      ctaLabel: "Open Live Center",
      ctaPath: "/live-center",
    },
  },
  {
    label: "Explore",
    path: "/teams",
    sections: [
      {
        title: "Teams & Players",
        items: [
          { label: "Teams", path: "/teams", desc: "Squads, captains, and recent form" },
          { label: "Players", path: "/players", desc: "Player cards, roles, and standout performers" },
        ],
      },
      {
        title: "Competitions",
        items: [
          { label: "Series", path: "/series", desc: "Tournament formats and active series hub" },
        ],
      },
    ],
    featured: {
      title: "Explore Hub",
      text: "Jump into teams, players, and tournament layers without crowding the main navbar.",
      ctaLabel: "Browse Teams",
      ctaPath: "/teams",
    },
  },
  {
    label: "Insights",
    path: "/points-table",
    sections: [
      {
        title: "Standings",
        items: [
          { label: "Points Table", path: "/points-table", desc: "Points, rankings, and net run rate" },
        ],
      },
      {
        title: "Content",
        items: [
          { label: "News", path: "/news", desc: "Headlines, stories, and analysis blocks" },
          { label: "Search", path: "/search", desc: "Find routes, teams, players, and stories" },
        ],
      },
    ],
    featured: {
      title: "Insight Desk",
      text: "Surface league context, stories, and quick discovery directly from the mega menu.",
      ctaLabel: "Open News",
      ctaPath: "/news",
    },
  },
];

function isItemActive(pathname, item) {
  if (item.path === "/") return pathname === "/";
  if (pathname === item.path) return true;
  return item.sections?.some((section) => section.items.some((child) => pathname.startsWith(child.path)));
}

function Brand() {
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-3">
      <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[18px] bg-gradient-to-br from-emerald-300 via-emerald-400 to-cyan-400 text-sm font-black text-slate-950 shadow-[0_16px_34px_rgba(16,185,129,0.30)] transition duration-300 group-hover:scale-[1.04] group-hover:rotate-[-4deg]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_42%)]" />
        <span className="relative">CP</span>
      </div>
      <div className="min-w-0">
        <p className="truncate text-lg font-black tracking-tight text-white">CricPulse</p>
        <p className="truncate text-[11px] uppercase tracking-[0.26em] text-slate-400">Mega Menu Navbar</p>
      </div>
    </Link>
  );
}

function DesktopTab({ item, pathname, activeMenu, setActiveMenu }) {
  const active = isItemActive(pathname, item);
  const open = activeMenu === item.label;

  if (item.simple) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          [
            "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300",
            isActive ? "bg-emerald-400 text-slate-950 shadow-[0_12px_28px_rgba(16,185,129,0.2)]" : "text-slate-300 hover:bg-white/5 hover:text-white",
          ].join(" ")
        }
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <button
      type="button"
      onMouseEnter={() => setActiveMenu(item.label)}
      onFocus={() => setActiveMenu(item.label)}
      onClick={() => setActiveMenu((prev) => (prev === item.label ? null : item.label))}
      className={[
        "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300",
        active || open
          ? "bg-emerald-400 text-slate-950 shadow-[0_12px_28px_rgba(16,185,129,0.2)]"
          : "text-slate-300 hover:bg-white/5 hover:text-white",
      ].join(" ")}
      aria-expanded={open}
    >
      <span>{item.label}</span>
      {item.badge ? (
        <span
          className={[
            "rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em]",
            active || open ? "bg-slate-950/10 text-slate-950" : "bg-emerald-400/10 text-emerald-300",
          ].join(" ")}
        >
          {item.badge}
        </span>
      ) : null}
      <span className={["text-xs transition duration-300", open ? "rotate-180" : "rotate-0"].join(" ")}>▾</span>
    </button>
  );
}

function MegaPanel({ item, closePanel }) {
  if (!item || item.simple) return null;

  return (
    <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.96),rgba(2,6,23,0.93))]">
      <div className="grid gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1.15fr_1.15fr_0.9fr] lg:px-8">
        {item.sections.map((section) => (
          <div key={section.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400">{section.title}</p>
            <div className="mt-3 grid gap-2">
              {section.items.map((child) => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  onClick={closePanel}
                  className={({ isActive }) =>
                    [
                      "rounded-2xl border px-4 py-3 transition",
                      isActive
                        ? "border-emerald-400/30 bg-emerald-400/10"
                        : "border-white/10 bg-slate-950/55 hover:border-white/15 hover:bg-white/[0.05]",
                    ].join(" ")
                  }
                >
                  <p className="text-sm font-black text-white">{child.label}</p>
                  <p className="mt-1 text-xs leading-6 text-slate-400">{child.desc}</p>
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(255,255,255,0.03))] p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">Featured panel</p>
          <h3 className="mt-3 text-xl font-black text-white">{item.featured.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{item.featured.text}</p>
          <Link
            to={item.featured.ctaPath}
            onClick={closePanel}
            className="mt-5 inline-flex rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
          >
            {item.featured.ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileSection({ item, pathname, expanded, toggleExpand, closeAll }) {
  const active = isItemActive(pathname, item);

  if (item.simple) {
    return (
      <NavLink
        to={item.path}
        onClick={closeAll}
        className={({ isActive }) =>
          [
            "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition",
            isActive ? "bg-emerald-400 text-slate-950" : "bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white",
          ].join(" ")
        }
      >
        <span>{item.label}</span>
      </NavLink>
    );
  }

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-2">
      <button
        type="button"
        onClick={() => toggleExpand(item.label)}
        className={[
          "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold transition",
          active || expanded ? "bg-emerald-400 text-slate-950" : "text-slate-200 hover:bg-white/5 hover:text-white",
        ].join(" ")}
      >
        <span className="flex items-center gap-2">
          <span>{item.label}</span>
          {item.badge ? (
            <span className={[
              "rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em]",
              active || expanded ? "bg-slate-950/10 text-slate-950" : "bg-emerald-400/10 text-emerald-300",
            ].join(" ")}>
              {item.badge}
            </span>
          ) : null}
        </span>
        <span className={["text-xs transition duration-300", expanded ? "rotate-180" : "rotate-0"].join(" ")}>▾</span>
      </button>

      {expanded ? (
        <div className="mt-3 grid gap-3 px-1 pb-1">
          {item.sections.map((section) => (
            <div key={section.title} className="rounded-[22px] border border-white/10 bg-slate-950/50 p-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">{section.title}</p>
              <div className="mt-3 grid gap-2">
                {section.items.map((child) => (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    onClick={closeAll}
                    className={({ isActive }) =>
                      [
                        "rounded-2xl border px-4 py-3 transition",
                        isActive
                          ? "border-emerald-400/25 bg-emerald-400/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]",
                      ].join(" ")
                    }
                  >
                    <p className="text-sm font-black text-white">{child.label}</p>
                    <p className="mt-1 text-xs leading-6 text-slate-400">{child.desc}</p>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-[22px] border border-white/10 bg-emerald-400/10 p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">Featured panel</p>
            <h3 className="mt-2 text-lg font-black text-white">{item.featured.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{item.featured.text}</p>
            <Link
              to={item.featured.ctaPath}
              onClick={closeAll}
              className="mt-4 inline-flex rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950"
            >
              {item.featured.ctaLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState(["Live"]);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const currentTitle = useMemo(() => {
    for (const item of navigation) {
      if (pathname === item.path) return item.label;
      for (const section of item.sections || []) {
        const matched = section.items.find((child) => pathname.startsWith(child.path));
        if (matched) return matched.label;
      }
    }
    return "CricPulse";
  }, [pathname]);

  const activeDesktopItem = navigation.find((item) => item.label === activeMenu);

  const toggleExpand = (label) => {
    setExpandedMobileMenus((prev) =>
      prev.includes(label) ? prev.filter((entry) => entry !== label) : [...prev, label]
    );
  };

  const closeAll = () => {
    setMobileOpen(false);
    setActiveMenu(null);
  };

  return (
    <header
      className="sticky top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-3"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 shadow-[0_24px_70px_rgba(2,6,23,0.38)] backdrop-blur-2xl">
        <div className="border-b border-white/5 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_24%)]">
          <div className="flex items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Managed Mega Menu
              </span>
              <span className="hidden text-[11px] uppercase tracking-[0.18em] text-slate-500 lg:inline">
                Current view: {currentTitle}
              </span>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link to="/search" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 transition hover:text-white">
                Quick Search
              </Link>
              <span className="text-white/10">/</span>
              <Link to="/news" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 transition hover:text-white">
                Newsroom
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Brand />

          <div className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
            <nav className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              {navigation.map((item) => (
                <DesktopTab
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                />
              ))}
            </nav>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/search"
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white lg:inline-flex"
            >
              <span className="text-slate-500">⌕</span>
              Search
            </Link>
            <Link
              to="/live-center"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:scale-[1.02] hover:brightness-105"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
              Open Live Center
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

        <div className="hidden xl:block">
          <MegaPanel item={activeDesktopItem} closePanel={() => setActiveMenu(null)} />
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.98),rgba(2,6,23,0.95))] xl:hidden">
            <div className="px-4 py-4 sm:px-6 lg:px-8">
              <div className="mb-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_60px_rgba(2,6,23,0.35)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-white">Mega Navigation Manager</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Grouped sections, feature panels, and cleaner route access</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                    {navigation.length} main sections
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Link
                    to="/search"
                    onClick={closeAll}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-center text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                  >
                    Open Search
                  </Link>
                  <Link
                    to="/live"
                    onClick={closeAll}
                    className="rounded-2xl bg-emerald-400 px-4 py-3 text-center text-sm font-black text-slate-950 transition hover:brightness-105"
                  >
                    Watch Live Flow
                  </Link>
                </div>
              </div>

              <div className="grid gap-3">
                {navigation.map((item) => (
                  <MobileSection
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    expanded={expandedMobileMenus.includes(item.label)}
                    toggleExpand={toggleExpand}
                    closeAll={closeAll}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
