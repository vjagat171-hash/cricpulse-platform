import SectionHeader from "../components/SectionHeader";

export default function SchedulePage({ schedule }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Fixtures"
        title="Upcoming and live matches"
        description="Schedule ko responsive cards me dikhaya gaya hai."
      />

      <div className="grid gap-4">
        {schedule.map((match) => (
          <div key={match.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {match.date} · {match.time}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{match.teams}</h3>
                <p className="mt-2 text-sm text-slate-300">{match.venue}</p>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                  match.status === "Live"
                    ? "bg-rose-500/15 text-rose-300"
                    : "bg-emerald-400/15 text-emerald-300"
                }`}
              >
                {match.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
