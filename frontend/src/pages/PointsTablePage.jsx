import usePointsTable from "../hooks/usePointsTable";
import PointsTable from "../components/PointsTable";
import ErrorBanner from "../components/ErrorBanner";
import EmptyState from "../components/EmptyState";

export default function PointsTablePage() {
  const { table, loading, error } = usePointsTable();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Standings</p>
        <h1 className="mt-2 text-4xl font-black text-white">Points table</h1>
      </div>
      <ErrorBanner message={error} />
      {loading ? <div className="h-44 animate-pulse rounded-[24px] bg-slate-900/80" /> : null}
      {!loading && !table.length ? <EmptyState title="No standings" text="Points table unavailable." /> : null}
      {!loading && table.length ? <PointsTable items={table} /> : null}
    </div>
  );
}
