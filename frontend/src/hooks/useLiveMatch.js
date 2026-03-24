import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const fallbackMatch = {
  id: "fallback-1",
  name: "Mumbai Indians vs Chennai Super Kings",
  status: "Live",
  venue: "Wankhede Stadium",
  score: "168/4 (18.4)",
  scoreA: "168/4 (18.4)",
  scoreB: "Yet to bat",
  teamA: "Mumbai Indians",
  teamB: "Chennai Super Kings",
  battingTeam: "Mumbai Indians",
  bowlingTeam: "Chennai Super Kings",
  lastBall: "4",
  recentOvers: ["1 4 1 0 6 2", "1 1 4 W 2 1", "6 1 1 2 4 0"],
  striker: { name: "S. Yadav", runs: 58, balls: 34, sr: 170.5 },
  nonStriker: { name: "H. Pandya", runs: 21, balls: 12, sr: 175.0 },
  bowler: { name: "K. Yadav", overs: "3.4", runs: 31, wickets: 1 },
};

const normalizeMatch = (item) => {
  if (!item) return fallbackMatch;

  return {
    ...fallbackMatch,
    ...item,
    scoreA: item.scoreA || item.score || fallbackMatch.scoreA,
    scoreB: item.scoreB || fallbackMatch.scoreB,
    teamA: item.teamA || item.battingTeam || fallbackMatch.teamA,
    teamB: item.teamB || item.bowlingTeam || fallbackMatch.teamB,
    battingTeam: item.battingTeam || item.teamA || fallbackMatch.battingTeam,
    bowlingTeam: item.bowlingTeam || item.teamB || fallbackMatch.bowlingTeam,
    recentOvers: Array.isArray(item.recentOvers) ? item.recentOvers : fallbackMatch.recentOvers,
    striker: item.striker || fallbackMatch.striker,
    nonStriker: item.nonStriker || fallbackMatch.nonStriker,
    bowler: item.bowler || fallbackMatch.bowler,
  };
};

export default function useLiveMatch() {
  const [match, setMatch] = useState(fallbackMatch);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const socket = useMemo(
    () => io(API_BASE_URL, { transports: ["websocket", "polling"] }),
    []
  );

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [matchRes, matchesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/live-match`),
          fetch(`${API_BASE_URL}/api/live-matches`),
        ]);

        const matchData = matchRes.ok ? await matchRes.json() : fallbackMatch;
        const matchesData = matchesRes.ok ? await matchesRes.json() : [fallbackMatch];

        if (!mounted) return;
        setMatch(normalizeMatch(matchData));
        setMatches(Array.isArray(matchesData) ? matchesData.map(normalizeMatch) : [fallbackMatch]);
      } catch (err) {
        if (!mounted) return;
        setError("Live API unavailable. Fallback data loaded.");
        setMatch(fallbackMatch);
        setMatches([fallbackMatch]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    socket.on("live-match-update", (payload) => {
      if (!mounted || !payload) return;
      setMatch((prev) => normalizeMatch({ ...prev, ...payload }));
    });

    return () => {
      mounted = false;
      socket.off("live-match-update");
      socket.disconnect();
    };
  }, [socket]);

  return { match, matches, loading, error };
}
