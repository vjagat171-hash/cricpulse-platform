export default function TeamCard({ team }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{team.name}</h3>
        <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-300">
          {team.short}
        </span>
      </div>
      <div className="space-y-2 text-sm text-slate-300">
        <p>Captain: {team.captain}</p>
        <p>Home: {team.venue}</p>
        <p>Recent form: {team.form}</p>
      </div>
    </div>
  );
}
