import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useApi from "./useApi"; // <-- Naya import add kar diya hai

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const fallbackMatch = {
  id: "match-1",
  matchId: "match-1",
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
  required: "Need 24 runs in 8 balls",
  recentOvers: ["1 4 1 0 6 2", "1 1 4 W 2 1", "6 1 1 2 4 0"],
  striker: { name: "S. Yadav", runs: 58, balls: 34, sr: 170.5 },
  nonStriker: { name: "H. Pandya", runs: 21, balls: 12, sr: 175.0 },
  bowler: { name: "K. Yadav", overs: "3.4", runs: 31, wickets: 1 },
  hotstarUrl: "https://www.hotstar.com/in/sports/cricket",
};

const normalizeMatch = (item) => {
  if (!item) return fallbackMatch;

  const teamA = item.teamA || item.battingTeam || fallbackMatch.teamA;
  const teamB = item.teamB || item.bowlingTeam || fallbackMatch.teamB;

  return {
    ...fallbackMatch,
    ...item,
    matchId: item.matchId || item.id || fallbackMatch.matchId,
    name: item.name || `${teamA} vs ${teamB}`,
    scoreA: item.scoreA || item.score || fallbackMatch.scoreA,
    scoreB: item.scoreB || fallbackMatch.scoreB,
    teamA,
    teamB,
    battingTeam: item.battingTeam || teamA,
    bowlingTeam: item.bowlingTeam || teamB,
    recentOvers: Array.isArray(item.recentOvers) ? item.recentOvers : fallbackMatch.recentOvers,
    striker: item.striker || fallbackMatch.striker,
    nonStriker: item.nonStriker || fallbackMatch.nonStriker,
    bowler: item.bowler || fallbackMatch.bowler,
    hotstarUrl: typeof item.hotstarUrl === "string" ? item.hotstarUrl : fallbackMatch.hotstarUrl,
  };
};

// --- 1. Real-time Socket Hook (Default Export) ---
export default function useLiveMatch() {
  const [match, setMatch] = useState(fallbackMatch);
  const [matches, setMatches] = useState([fallbackMatch]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const serverReachableRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const socket = io(API_BASE_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [matchRes, matchesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/live-match`),
          fetch(`${API_BASE_URL}/api/live-matches`),
        ]);

        if (!mounted) return;

        serverReachableRef.current = true;

        const matchData = matchRes.ok ? await matchRes.json() : fallbackMatch;
        const matchesData = matchesRes.ok ? await matchesRes.json() : [fallbackMatch];

        const normalizedFeatured = normalizeMatch(matchData);
        const normalizedMatches = Array.isArray(matchesData)
          ? matchesData.map(normalizeMatch)
          : [fallbackMatch];

        const mergedMatches = normalizedMatches.length ? normalizedMatches : [normalizedFeatured];

        setMatch(normalizedFeatured);
        setMatches(mergedMatches);
        setError("");
      } catch (err) {
        if (!mounted) return;
        serverReachableRef.current = false;
        setError("Backend reachable nahi hai, fallback live data show ho raha hai.");
        setMatch(fallbackMatch);
        setMatches([fallbackMatch]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    socket.on("connect", () => {
      if (!mounted) return;
      if (serverReachableRef.current) {
        setError("");
      }
    });

    socket.on("connect_error", () => {
      if (!mounted) return;
      if (!serverReachableRef.current) {
        setError("Realtime socket connect nahi ho paaya, fallback data active hai.");
      }
    });

    socket.on("live-match-update", (payload) => {
      if (!mounted || !payload) return;

      const normalizedPayload = normalizeMatch(payload);

      setMatch((prev) => normalizeMatch({ ...prev, ...normalizedPayload }));

      setMatches((prev) => {
        const next = Array.isArray(prev) ? [...prev] : [];
        const index = next.findIndex(
          (x) => x.id === normalizedPayload.id || x.matchId === normalizedPayload.matchId
        );

        if (index >= 0) {
          next[index] = normalizeMatch({ ...next[index], ...normalizedPayload });
        } else {
          next.unshift(normalizedPayload);
        }
        
        return next.length ? next : [normalizedPayload];
      });
    });

    return () => {
      mounted = false;
      socket.off("connect");
      socket.off("connect_error");
      socket.off("live-match-update");
      socket.disconnect();
    };
  }, []);

  return { match, matches, loading, error };
}

// --- 2. Simple Fetch/Polling Hook (Named Export) ---
export function useLiveMatches() {
  const { data, loading, error, refetch } = useApi("/api/live-matches", { initialData: [] });
  
  return {
    matches: Array.isArray(data) ? data : [],
    loading,
    error,
    refetch,
  };
}