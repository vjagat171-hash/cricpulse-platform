import { useMemo, useState } from "react";
import useApi from "../hooks/useApi";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import ErrorBanner from "../components/ErrorBanner";
import EmptyState from "../components/EmptyState";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);
  const path = debounced ? `/api/search?q=${encodeURIComponent(debounced)}` : "";
  const { data, loading, error } = useApi(path, {
    initialData: { matches: [], teams: [], players: [] },
    enabled: Boolean(path),
  });

  const groups = useMemo(
    () => ({
      matches: Array.isArray(data?.matches) ? data.matches : [],
      teams: Array.isArray(data?.teams) ? data.teams : [],
      players: Array.isArray(data?.players) ? data.players : [],
    }),
    [data]
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Search</p>
        <h1 className="mt-2 text-4xl font-black text-white">Find matches, teams, and players</h1>
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search matches, teams, players"
      />

      <ErrorBanner message={error} />

      {!query ? <EmptyState title="Start typing" text="Search results will appear here." /> : null}

      {loading && query ? (
        <div className="h-36 animate-pulse rounded-[24px] bg-slate-900/80" />
      ) : null}

      {query && !loading ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5">
            <h3 className="text-xl font-black text-white">Matches</h3>
            <div className="mt-4 space-y-3">
              {groups.matches.length ? (
                groups.matches.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-slate-950/70 p-4 text-sm text-slate-300">
                    {item.name}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No matches.</p>
              )}
            </div>
          </section>

          <section className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5">
            <h3 className="text-xl font-black text-white">Teams</h3>
            <div className="mt-4 space-y-3">
              {groups.teams.length ? (
                groups.teams.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-slate-950/70 p-4 text-sm text-slate-300">
                    {item.name}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No teams.</p>
              )}
            </div>
          </section>

          <section className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5">
            <h3 className="text-xl font-black text-white">Players</h3>
            <div className="mt-4 space-y-3">
              {groups.players.length ? (
                groups.players.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-slate-950/70 p-4 text-sm text-slate-300">
                    {item.name}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No players.</p>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
