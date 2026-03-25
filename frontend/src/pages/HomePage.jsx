import { Link } from "react-router-dom";
import useLiveMatch from "../hooks/useLiveMatch";
import useNews from "../hooks/useNews";
import useSchedule from "../hooks/useSchedule";
import useTeams from "../hooks/useTeams";
import usePlayers from "../hooks/usePlayers";
import useSeries from "../hooks/useSeries";
import usePointsTable from "../hooks/usePointsTable";
import ErrorBanner from "../components/ErrorBanner";
import SkeletonCard from "../components/SkeletonCard";

function SectionTitle({ eyebrow, title, text, actionLabel, actionPath }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">{text}</p>
      </div>
      {actionLabel && actionPath ? (
        <Link
          to={actionPath}
          className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

function StatCard({ label, value, helper, tone = "emerald" }) {
  const tones = {
    emerald: "from-emerald-400/20 to-emerald-500/5",
    cyan: "from-cyan-400/20 to-cyan-500/5",
    violet: "from-violet-400/20 to-violet-500/5",
    amber: "from-amber-400/20 to-amber-500/5",
  };

  return (
    <div className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${tones[tone]} p-5 shadow-xl`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-black text-white break-words">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{helper}</p>
    </div>
  );
}

function MiniCard({ title, value, subtext }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <p className="mt-3 text-2xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{subtext}</p>
    </div>
  );
}

function QuickLinkCard({ title, text, path }) {
  return (
    <Link
      to={path}
      className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5 transition hover:-translate-y-0.5 hover:border-emerald-400/30"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Explore</p>
      <h3 className="mt-3 text-xl font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
    </Link>
  );
}

export default function HomePage() {
  const { match, matches, loading, error } = useLiveMatch();
  const { news } = useNews();
  const { schedule } = useSchedule();
  const { teams } = useTeams();
  const { players } = usePlayers();
  const { series } = useSeries();
  const { table } = usePointsTable();

  const totalLive = Array.isArray(matches) ? matches.length : 0;
  const headlineNews = Array.isArray(news) ? news.slice(0, 3) : [];
  const upcoming = Array.isArray(schedule) ? schedule.slice(0, 4) : [];
  const topTeams = Array.isArray(teams) ? teams.slice(0, 4) : [];
  const topPlayers = Array.isArray(players) ? players.slice(0, 3) : [];
  const topSeries = Array.isArray(series) ? series.slice(0, 3) : [];
  const standings = Array.isArray(table) ? table.slice(0, 4) : [];

  return (
    <div className="space-y-10 sm:space-y-12">
      <ErrorBanner message={error} />

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-2xl sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_28%)]" />
          <div className="relative z-10">
            <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300">
              Premium Live Cricket Platform
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Track live cricket momentum with a sharper, deeper, more responsive homepage.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Move from live center to schedules, series, players, standings, and search without losing the match context or mobile usability.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/live-center" className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]">
                Open Live Center
              </Link>
              <Link to="/search" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
                Search Platform
              </Link>
              <Link to="/series" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
                Explore Series
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard label="Live matches" value={String(totalLive).padStart(2, "0")} helper="Realtime featured cards and dynamic feeds" tone="emerald" />
              <StatCard label="Featured status" value={match?.status || "Live"} helper="Current match flow and momentum label" tone="cyan" />
              <StatCard label="Venue" value={match?.venue || "Matchday"} helper="Fast venue visibility on all screens" tone="violet" />
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-2xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">Featured match</p>
          {loading ? (
            <div className="mt-5 space-y-4">
              <SkeletonCard />
            </div>
          ) : (
            <div className="mt-5 space-y-5">
              <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-black text-white">{match?.name || "Featured match"}</h3>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    {match?.status || "Live"}
                  </span>
                </div>
                <p className="mt-4 text-4xl font-black text-white">{match?.scoreA || match?.score || "168/4 (18.4)"}</p>
                <p className="mt-2 text-sm text-slate-400">{match?.required || "Momentum building in the death overs."}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniCard title="Batting side" value={match?.battingTeam || match?.teamA || "Team A"} subtext="Current pressure and run flow" />
                <MiniCard title="Last ball" value={match?.lastBall || "4"} subtext="Latest delivery result" />
              </div>

              <Link
                to={match?.matchId ? `/match/${match.matchId}` : "/live-center"}
                className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
              >
                View match details
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MiniCard title="Series running" value={String(topSeries.length).padStart(2, "0")} subtext="Tournament discovery on homepage" />
        <MiniCard title="Teams tracked" value={String(topTeams.length).padStart(2, "0")} subtext="Popular teams in quick access blocks" />
        <MiniCard title="Top players" value={String(topPlayers.length).padStart(2, "0")} subtext="Fast player discovery and stats cards" />
        <MiniCard title="News stories" value={String(headlineNews.length).padStart(2, "0")} subtext="Editorial signal beyond score-only UI" />
      </section>

      <section className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-xl sm:p-8">
        <SectionTitle
          eyebrow="Platform features"
          title="More sections, more utility"
          text="This homepage now works like a sports dashboard instead of a single hero screen, with direct access to players, standings, schedules, and series discovery."
          actionLabel="Go to search"
          actionPath="/search"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Featured live match summary with fast score context",
            "Quick route navigation for players, teams, and series",
            "Schedule, standings, and stories layered on the same page",
            "Responsive card system for mobile and desktop browsing",
          ].map((item) => (
            <div key={item} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5 text-sm leading-7 text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-xl sm:p-8">
          <SectionTitle
            eyebrow="Upcoming fixtures"
            title="Schedule snapshot"
            text="Give users a faster view of what comes next so the homepage keeps moving even before they open the schedule page."
            actionLabel="Full schedule"
            actionPath="/schedule"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {upcoming.length ? (
              upcoming.map((item) => (
                <div key={item.id} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-black text-white">{item.teams}</h3>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{item.date} • {item.time}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.venue}</p>
                </div>
              ))
            ) : (
              <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-950/60 p-5 text-sm text-slate-500 sm:col-span-2">
                Schedule data is not available right now.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-xl sm:p-8">
          <SectionTitle
            eyebrow="Standings"
            title="Points table preview"
            text="Bring league context directly to the homepage so users understand the match stakes before opening the table page."
            actionLabel="View table"
            actionPath="/points-table"
          />

          <div className="mt-6 space-y-3">
            {standings.length ? (
              standings.map((item, index) => (
                <div key={item.id} className="grid grid-cols-[40px_1fr_50px_50px] items-center gap-3 rounded-[20px] border border-white/10 bg-slate-950/70 px-4 py-4">
                  <p className="text-sm font-black text-emerald-300">#{index + 1}</p>
                  <div>
                    <p className="font-semibold text-white">{item.team}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">NRR {item.nrr}</p>
                  </div>
                  <p className="text-center text-sm font-semibold text-slate-300">{item.played}</p>
                  <p className="text-center text-sm font-black text-white">{item.points}</p>
                </div>
              ))
            ) : (
              <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-950/60 p-5 text-sm text-slate-500">
                Table data is not available right now.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-xl sm:p-8">
          <SectionTitle
            eyebrow="Navigate faster"
            title="Quick access blocks"
            text="Use direct route cards so desktop and mobile users can move across the platform even without relying only on the header menu."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickLinkCard title="Players" text="Open player boards, role labels, and top stat cards." path="/players" />
            <QuickLinkCard title="Teams" text="Browse team cards, captains, and venue info." path="/teams" />
            <QuickLinkCard title="Series" text="View active and upcoming tournaments in a compact grid." path="/series" />
            <QuickLinkCard title="News" text="Read analysis cards and story highlights with better spacing." path="/news" />
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-xl sm:p-8">
          <SectionTitle
            eyebrow="Trending stories"
            title="News and analysis"
            text="Short editorial blocks make the homepage richer and give the product a complete sports-platform feel beyond score-only UI."
            actionLabel="Open news"
            actionPath="/news"
          />

          <div className="mt-6 grid gap-4">
            {headlineNews.length ? (
              headlineNews.map((item) => (
                <article key={item.id} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                      {item.tag}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      {item.readTime}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-black text-white">{item.title}</h3>
                </article>
              ))
            ) : (
              <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-950/60 p-5 text-sm text-slate-500">
                News feed is not available right now.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-xl sm:p-8">
          <SectionTitle
            eyebrow="Top players"
            title="Player spotlight"
            text="Add star player visibility directly on the homepage to improve discovery and make the platform feel more complete."
            actionLabel="All players"
            actionPath="/players"
          />

          <div className="mt-6 grid gap-4">
            {topPlayers.length ? (
              topPlayers.map((player) => (
                <div key={player.id} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">{player.role}</p>
                      <h3 className="mt-2 text-xl font-black text-white">{player.name}</h3>
                      <p className="mt-2 text-sm text-slate-400">{player.team}</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 px-4 py-3 text-right">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Strike Rate</p>
                      <p className="mt-1 text-lg font-black text-white">{player.strikeRate}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-950/60 p-5 text-sm text-slate-500">
                Player data is not available right now.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-xl sm:p-8">
          <SectionTitle
            eyebrow="Team pulse"
            title="Trending teams"
            text="Show quick team form and venue context on the homepage so the product immediately feels broader than one match."
            actionLabel="All teams"
            actionPath="/teams"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {topTeams.length ? (
              topTeams.map((team) => (
                <div key={team.id} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">{team.short}</p>
                  <h3 className="mt-2 text-xl font-black text-white">{team.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">Captain: {team.captain}</p>
                  <p className="mt-1 text-sm text-slate-500">Form: {team.form}</p>
                </div>
              ))
            ) : (
              <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-950/60 p-5 text-sm text-slate-500 sm:col-span-2">
                Team data is not available right now.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-xl sm:p-8">
        <SectionTitle
          eyebrow="Series hub"
          title="Tournament overview"
          text="A dedicated series section gives the homepage more depth and makes tournament navigation much easier on mobile and desktop."
          actionLabel="View series"
          actionPath="/series"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {topSeries.length ? (
            topSeries.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">{item.format}</p>
                <h3 className="mt-2 text-xl font-black text-white">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-400">Matches: {item.matches}</p>
                <p className="mt-1 text-sm text-slate-500">Status: {item.status}</p>
              </div>
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-950/60 p-5 text-sm text-slate-500 md:col-span-3">
              Series data is not available right now.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-gradient-to-r from-emerald-400/15 via-cyan-400/10 to-violet-400/15 p-6 shadow-xl sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">Final call to action</p>
            <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Keep users moving from homepage to deep match routes.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              This upgraded homepage adds more discovery, more context, and better navigation depth while staying responsive across mobile, tablet, and desktop layouts.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/live" className="rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]">
              Watch Live Flow
            </Link>
            <Link to="/match/match-1" className="rounded-full border border-white/15 bg-slate-950/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-950/60">
              Open Match Route
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
