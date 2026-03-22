import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import { stats, features } from "../data/mockData";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/70 p-8 sm:p-10">
        <span className="inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
          Live batting experience
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Modern cricket platform focused on live batting flow, clean match data, and premium UI.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          CricPulse ko homepage se hi sports product feel dene ke liye hero, feature cards, and compact stats use kiye gaye hain.
        </p>
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
    </div>
  );
}
