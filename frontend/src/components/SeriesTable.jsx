export default function SeriesTable({ items = [] }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/80 shadow-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.18em] text-slate-400">
            <tr>
              <th className="px-4 py-4">Series</th>
              <th className="px-4 py-4">Format</th>
              <th className="px-4 py-4">Matches</th>
              <th className="px-4 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-white/5">
                <td className="px-4 py-4 font-semibold text-white">{item.name}</td>
                <td className="px-4 py-4">{item.format}</td>
                <td className="px-4 py-4">{item.matches}</td>
                <td className="px-4 py-4">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
