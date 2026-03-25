import usePlayers from "../hooks/usePlayers";
import PlayerStatsCard from "../components/PlayerStatsCard";
import ErrorBanner from "../components/ErrorBanner";
import EmptyState from "../components/EmptyState";

export default function PlayersPage() {
  const { players, loading, error } = usePlayers();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Players</p>
        <h1 className="mt-2 text-4xl font-black text-white">Top player boards</h1>
      </div>
      <ErrorBanner message={error} />
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="h-44 animate-pulse rounded-[24px] bg-slate-900/80" />
          <div className="h-44 animate-pulse rounded-[24px] bg-slate-900/80" />
          <div className="h-44 animate-pulse rounded-[24px] bg-slate-900/80" />
        </div>
      ) : null}
      {!loading && !players.length ? <EmptyState title="No players" text="Player data unavailable." /> : null}
      {!loading && players.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {players.map((player) => <PlayerStatsCard key={player.id} player={player} />)}
        </div>
      ) : null}
    </div>
  );
}
