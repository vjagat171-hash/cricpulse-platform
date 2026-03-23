import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function useLiveMatch() {
  const [match, setMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const socket = useMemo(
    () => io(API_BASE_URL, { transports: ["websocket", "polling"] }),
    []
  );

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const [matchRes, matchesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/live-match`),
          fetch(`${API_BASE_URL}/api/live-matches`),
        ]);

        const matchData = await matchRes.json();
        const matchesData = await matchesRes.json();

        if (!mounted) return;
        setMatch(matchData);
        setMatches(Array.isArray(matchesData) ? matchesData : []);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    socket.on("live-match-update", (payload) => {
      if (!mounted || !payload) return;
      setMatch(payload);
    });

    return () => {
      mounted = false;
      socket.off("live-match-update");
      socket.disconnect();
    };
  }, [socket]);

  return { match, matches, loading };
}
