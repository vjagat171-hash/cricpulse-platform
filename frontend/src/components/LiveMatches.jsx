import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useLiveMatch from "../hooks/useLiveMatch";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function LiveMatches() {
  const { matches, loading, error } = useLiveMatch();
  const [realTimeMatch, setRealTimeMatch] = useState(null);

  useEffect(() => {
    const socket = io(API_BASE_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.on("live-match-update", (data) => {
      if (data) {
        setRealTimeMatch(data);
      }
    });

    return () => {
      socket.off("live-match-update");
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212] p-5">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-10 text-center text-slate-300 shadow-xl">
          Live matches loading...
        </div>
      </div>
    );
  }

  const allMatches = Array.isArray(matches) ? matches : [];
  const visibleMatches = realTimeMatch
    ? allMatches.filter(
        (match) =>
          match?.id !== realTimeMatch?.id &&
          match?.matchId !== realTimeMatch?.matchId
      )
    : allMatches;

  return (
    <div className="min-h-screen bg-[#121212] p-5 font-sans">
      <div className="mx-auto max-w-7xl space-y-8">
        <h2 className="mt-4 text-center text-3xl font-black text-sky-400 drop-shadow-md md:text-4xl">
          CricPulse Dashboard
        </h2>

        {error ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-200">
            {error}
          </div>
        ) : null}

        {realTimeMatch ? (
          <div className="flex justify-center">
            <div className="w-full max-w-3xl rounded-[24px] border-2 border-emerald-500/80 bg-gradient-to-br from-[#122417] to-[#1a3300] p-6 shadow-[0_0_24px_rgba(0,230,118,0.15)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-bold tracking-[0.15em] text-emerald-400 drop-shadow-sm">
                  FEATURED LIVE
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-900/50 px-3 py-1 text-xs font-medium text-emerald-100">
                  {realTimeMatch.status || "Live"}
                </span>
              </div>

              <h3 className="my-5 text-center text-2xl font-black text-white md:text-left">
                {realTimeMatch.teamA} <span className="text-emerald-500">vs</span> {realTimeMatch.teamB}
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 shadow-inner">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-400">
                    {realTimeMatch.teamA}
                  </p>
                  <h4 className="mt-2 text-3xl font-black text-white">
                    {realTimeMatch.scoreA || realTimeMatch.score || "0/0"}
                  </h4>
                </div>

                <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 shadow-inner">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400">
                    {realTimeMatch.teamB}
                  </p>
                  <h4 className="mt-2 text-3xl font-black text-white">
                    {realTimeMatch.scoreB || "Yet to bat"}
                  </h4>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                <span className="opacity-80">Last Ball:</span>
                <strong className="rounded bg-white/10 px-2 py-0.5 text-white">
                  {realTimeMatch.lastBall || "-"}
                </strong>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleMatches.length ? (
            visibleMatches.map((match) => (
              <article
                key={match.id || match.matchId}
                className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                    {match.status}
                  </p>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {match.lastBall || "Live"}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-black text-white">{match.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{match.venue}</p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-sky-400">{match.teamA}</p>
                    <p className="mt-2 text-2xl font-black text-white">{match.scoreA || match.score || "0/0"}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-400">{match.teamB}</p>
                    <p className="mt-2 text-2xl font-black text-white">{match.scoreB || "Yet to bat"}</p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-900/70 p-10 text-center text-slate-400 md:col-span-2 xl:col-span-3">
              No live matches available right now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
