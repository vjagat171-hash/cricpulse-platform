import useSeries from "../hooks/useSeries";
import SeriesTable from "../components/SeriesTable";
import ErrorBanner from "../components/ErrorBanner";
import EmptyState from "../components/EmptyState";

export default function SeriesPage() {
  const { series, loading, error } = useSeries();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Series</p>
        <h1 className="mt-2 text-4xl font-black text-white">Tournaments and series</h1>
      </div>
      <ErrorBanner message={error} />
      {loading ? <div className="h-44 animate-pulse rounded-[24px] bg-slate-900/80" /> : null}
      {!loading && !series.length ? <EmptyState title="No series" text="Series data unavailable." /> : null}
      {!loading && series.length ? <SeriesTable items={series} /> : null}
    </div>
  );
}
