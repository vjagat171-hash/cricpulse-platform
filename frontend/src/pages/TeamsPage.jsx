import SectionHeader from "../components/SectionHeader";

export default function TeamsPage({ teams = [] }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Teams"
        title="Squads, captains, and form"
        description="Team cards ko responsive style me build kiya gaya hai taaki future squad details bhi add ho sakein."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {teams.length ? (
          teams.map((team) => (
            <article key={team.id} className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">{team.short}</p>
                  <h3 className="mt-2 text-2xl font-black text-white">{team.name}</h3>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/10 text-lg font-black text-emerald-300">
                  {team.short}
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl bg-slate-950/60 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Captain</p>
                  <p className="mt-2 text-lg font-bold text-white">{team.captain}</p>
                </div>
                <div className="rounded-2xl bg-slate-950/60 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Home venue</p>
                  <p className="mt-2 text-lg font-bold text-white">{team.venue}</p>
                </div>
                <div className="rounded-2xl bg-slate-950/60 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Recent form</p>
                  <p className="mt-2 text-lg font-bold text-white">{team.form}</p>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-slate-900/70 p-10 text-center text-slate-400 md:col-span-2 xl:col-span-3">
            No team data available right now.
          </div>
        )}
      </div>
    </div>
  );
}
