export default function RecentOvers({ overs = [] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">Recent overs</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {overs.length ? (
          overs.map((item, index) => (
            <div key={index} className="rounded-xl bg-slate-800 px-4 py-3 text-sm text-slate-200">
              {item}
            </div>
          ))
        ) : (
          <p className="text-slate-500">No recent overs data.</p>
        )}
      </div>
    </div>
  );
}
