export default function PointsTable({ items = [] }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/80 shadow-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.18em] text-slate-400">
            <tr>
              <th className="px-4 py-4">Team</th>
              <th className="px-4 py-4">P</th>
              <th className="px-4 py-4">W</th>
              <th className="px-4 py-4">L</th>
              <th className="px-4 py-4">NRR</th>
              <th className="px-4 py-4">Pts</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-white/5">
                <td className="px-4 py-4 font-semibold text-white">{item.team}</td>
                <td className="px-4 py-4">{item.played}</td>
                <td className="px-4 py-4">{item.won}</td>
                <td className="px-4 py-4">{item.lost}</td>
                <td className="px-4 py-4">{item.nrr}</td>
                <td className="px-4 py-4">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
