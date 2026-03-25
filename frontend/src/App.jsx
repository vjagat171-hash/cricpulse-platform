import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const HomePage = lazy(() => import("./pages/HomePage"));
const LivePage = lazy(() => import("./pages/LivePage"));
const LiveCenterPage = lazy(() => import("./pages/LiveCenterPage"));
const SchedulePage = lazy(() => import("./pages/SchedulePage"));
const TeamsPage = lazy(() => import("./pages/TeamsPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LiveMatches = lazy(() => import("./components/LiveMatches"));
const SeriesPage = lazy(() => import("./pages/SeriesPage"));
const PointsTablePage = lazy(() => import("./pages/PointsTablePage"));
const PlayersPage = lazy(() => import("./pages/PlayersPage"));
const MatchDetailsPage = lazy(() => import("./pages/MatchDetailsPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

const routeConfig = [
  { path: "/", element: <HomePage />, label: "Home" },
  { path: "/live", element: <LivePage />, label: "Live" },
  { path: "/live-center", element: <LiveCenterPage />, label: "Center" },
  { path: "/live-matches", element: <LiveMatches />, label: "Matches" },
  { path: "/schedule", element: <SchedulePage />, label: "Schedule" },
  { path: "/teams", element: <TeamsPage />, label: "Teams" },
  { path: "/players", element: <PlayersPage />, label: "Players" },
  { path: "/series", element: <SeriesPage />, label: "Series" },
  { path: "/points-table", element: <PointsTablePage />, label: "Table" },
  { path: "/news", element: <NewsPage />, label: "News" },
  { path: "/search", element: <SearchPage />, label: "Search" },
];

function PageLoader() {
  return (
    <div className="grid min-h-[45vh] place-items-center rounded-[28px] border border-white/10 bg-slate-900/70 px-6 py-16 text-center shadow-xl">
      <div>
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-400/20 border-t-emerald-400" />
        <p className="mt-4 text-sm font-medium tracking-[0.18em] text-slate-400 uppercase">Loading CricPulse</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function MobileQuickNav() {
  const { pathname } = useLocation();
  const quickItems = routeConfig.slice(0, 5);

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 rounded-[24px] border border-white/10 bg-slate-950/90 p-2 shadow-2xl backdrop-blur md:hidden">
      <div className="grid grid-cols-5 gap-2">
        {quickItems.map((item) => {
          const active = pathname === item.path;
          return (
            <a
              key={item.path}
              href={item.path}
              className={[
                "rounded-2xl px-2 py-3 text-center text-[11px] font-semibold transition",
                active
                  ? "bg-emerald-400 text-slate-950"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-[-8%] top-[10%] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <ScrollToTop />
      <Header />

      <section className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pt-6 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400">CricPulse Platform</p>
          <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">Advanced live cricket experience</h1>
        </div>
        <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right md:block">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Experience</p>
          <p className="mt-1 text-sm font-semibold text-white">Responsive routes, live center, search, stats</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6 lg:px-8 lg:pb-10">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {routeConfig.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="/match/:id" element={<MatchDetailsPage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <MobileQuickNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
