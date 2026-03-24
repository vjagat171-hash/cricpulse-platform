import SectionHeader from "../components/SectionHeader";

export default function SchedulePage({ schedule = [] }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Fixtures"
        title="Schedule and match windows"
        description="Upcoming fixtures, venue details, and match status ek clean responsive layout me."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {schedule.length ? (
          schedule.map((item) => (
            <article
              key={item.id}
              className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-xl transition hover:-translate-y-1 hover:border-emerald-400/20"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">{item.status}</p>
                  <h3 className="mt-2 text-2xl font-black text-white">{item.teams}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.venue}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
                  {item.time}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-950/60 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Date</p>
                  <p className="mt-2 text-lg font-bold text-white">{item.date}</p>
                </div>
                <div className="rounded-2xl bg-slate-950/60 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Venue</p>
                  <p className="mt-2 text-lg font-bold text-white">{item.venue}</p>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-slate-900/70 p-10 text-center text-slate-400 lg:col-span-2">
            No fixtures available right now.
          </div>
        )}
      </div>
    </div>
  );
}
