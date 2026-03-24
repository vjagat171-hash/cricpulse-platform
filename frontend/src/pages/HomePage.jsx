import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import { stats, features } from "../data/mockData";

const quickLinks = [
  {
    title: "Live center",
    text: "Detailed live match hub with batting panels, recent overs, and realtime updates.",
    to: "/live-center",
  },
  {
    title: "Live matches",
    text: "Fast scoreboard cards for multiple ongoing matches in one responsive grid.",
    to: "/live-matches",
  },
  {
    title: "Schedule",
    text: "Upcoming fixtures, venues, and match timing blocks for planning the day.",
    to: "/schedule",
  },
  {
    title: "Teams",
    text: "Team cards for squads, form, captain details, and future expansion.",
    to: "/teams",
  },
];

const livePillars = [
  {
    title: "Realtime match layer",
    text: "Socket updates keep the featured match active while API requests fill the rest of the live board.",
  },
  {
    title: "Batting-first UX",
    text: "The homepage now points users toward striker, non-striker, bowler, and over-by-over context.",
  },
  {
    title: "Scalable layout",
    text: "Sections are modular so you can keep adding commentary, standings, player analytics, and series blocks.",
  },
];

const spotlightCards = [
  {
    eyebrow: "Live hub",
    title: "Track match pressure in one place",
    text: "Jump straight into the live center for scoreboard flow, batting snapshots, and recent overs context.",
    to: "/live-center",
    cta: "Open live center",
  },
  {
    eyebrow: "Teams",
    title: "Browse squads and current form",
    text: "Keep team identity, venue, captain, and form cards visible so the platform feels complete beyond scores.",
    to: "/teams",
    cta: "View teams",
  },
];

const productMetrics = [
  { label: "Live routes", value: "4+" },
  { label: "Responsive grids", value: "100%" },
  { label: "Realtime layer", value: "Socket" },
  { label: "UI style", value: "Premium" },
];

const featureRoadmap = [
  "Ball-by-ball commentary stream",
  "Player-vs-player matchup cards",
  "Series standings and points table",
  "Batting analytics with strike-rate splits",
  "Venue insights and match conditions",
  "Pinned live alerts and trend widgets",
];

const audienceBenefits = [
  {
    title: "For fans",
    text: "Fast access to live score, pressure points, and match navigation without digging through clutter.",
  },
  {
    title: "For analysts",
    text: "The structure supports future player stats, over patterns, and matchup insights on the same design system.",
  },
  {
    title: "For the product",
    text: "Clear sectioning makes the homepage feel like a real sports platform instead of a simple landing page.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10 lg:space-y-12">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/70 p-8 shadow-2xl sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
              Live batting experience
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Modern cricket platform focused on live batting flow, clean match data, and premium UI.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              CricPulse homepage ko ab sports-product feel dene ke liye live navigation, quick access blocks, stronger highlights,
              roadmap sections, and premium action panels add kiye gaye hain.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/live-center"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Open Live Center
              </Link>
              <Link
                to="/live-matches"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Live Matches
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-emerald-400/15 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Live focus</p>
              <h3 className="mt-3 text-2xl font-bold text-white">Batting and momentum</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Striker details, recent overs, and scoreboard pressure blocks homepage flow ko stronger banate hain.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/15 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Responsive UI</p>
              <h3 className="mt-3 text-2xl font-bold text-white">Cards for every screen</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Mobile, tablet, and desktop layout ke liye stacked grids aur compact blocks ready hain.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Quick access"
          title="Main cricket sections"
          description="Homepage se direct important pages par jaana easy ho jata hai."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/20 hover:bg-white/[0.07]"
            >
              <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-emerald-300">{item.title}</h3>
              <p className="text-sm leading-6 text-slate-300">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Platform features"
          title="Core homepage modules"
          description="Ye reusable cards future pages me bhi use ho sakte hain."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-6 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Live product"
          title="Why this homepage feels stronger"
          description="Ye naye blocks site ko zyada premium aur dynamic banate hain."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {livePillars.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {spotlightCards.map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">{item.eyebrow}</p>
            <h3 className="mt-3 text-3xl font-black text-white">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{item.text}</p>
            <Link
              to={item.to}
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              {item.cta}
            </Link>
          </div>
        ))}
      </section>

      <section>
        <SectionHeader
          eyebrow="Match snapshot"
          title="Key numbers"
          description="Fast scanning ke liye compact cards."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <StatCard key={item.label} label={item.label} value={item.value} accent={index === 0} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Product system"
          title="Platform at a glance"
          description="Ye small metric cards homepage ko more product-like feel dete hain."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {productMetrics.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-center shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              <h3 className="mt-3 text-3xl font-black text-white">{item.value}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl sm:p-8">
          <SectionHeader
            eyebrow="Roadmap"
            title="Upcoming upgrades"
            description="Ye topic-based sections next versions me add kiye ja sakte hain."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {featureRoadmap.map((item) => (
              <div key={item} className="rounded-2xl border border-white/5 bg-slate-950/60 px-4 py-4 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-6 shadow-xl sm:p-8">
          <SectionHeader
            eyebrow="Audience"
            title="Why this layout works"
            description="Different users ko alag value milti hai."
          />
          <div className="space-y-4">
            {audienceBenefits.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-emerald-400/10 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 p-6 shadow-xl sm:p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Final callout</p>
            <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl">Build the full cricket live experience</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Commentary panel, player cards, series table, batting analytics, and richer live APIs ko next step me plug kiya ja sakta hai.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/live"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Go to Live Page
            </Link>
            <Link
              to="/schedule"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
