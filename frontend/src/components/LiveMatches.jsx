import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const socket = io(API_BASE_URL, { transports: ["websocket", "polling"] });

const cardStyle = {
  background: "#1f2937",
  border: "1px solid #374151",
  borderRadius: "16px",
  padding: "18px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [realTimeMatch, setRealTimeMatch] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE_URL}/api/live-matches`);
        const data = await res.json();
        setMatches(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Live API failed, fallback data loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();

    socket.on("live-match-update", (data) => {
      setRealTimeMatch(data);
    });

    return () => {
      socket.off("live-match-update");
    };
  }, []);

  if (loading) {
    return (
      <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Live matches loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "white",
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#4da6ff" }}>
        🏏 CricPulse Dashboard
      </h2>

      {error ? (
        <p style={{ textAlign: "center", color: "#fbbf24", marginBottom: "16px" }}>{error}</p>
      ) : null}

      {realTimeMatch ? (
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              border: "2px solid #00e676",
              borderRadius: "16px",
              padding: "20px",
              background: "linear-gradient(135deg, #122417, #1a3300)",
              boxShadow: "0 0 24px rgba(0, 230, 118, 0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ color: "#00e676", fontWeight: "bold", letterSpacing: "1px" }}>
                FEATURED LIVE
              </span>
              <span style={{ color: "#e5e7eb" }}>{realTimeMatch.status}</span>
            </div>

            <h3 style={{ margin: "14px 0 16px", fontSize: "24px" }}>
              {realTimeMatch.teamA} vs {realTimeMatch.teamB}
            </h3>

            <div style={{ display: "grid", gap: "14px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div style={cardStyle}>
                <p style={{ color: "#93c5fd", margin: 0, fontSize: "13px" }}>{realTimeMatch.teamA}</p>
                <h4 style={{ margin: "8px 0 0", fontSize: "24px" }}>{realTimeMatch.scoreA}</h4>
              </div>

              <div style={cardStyle}>
                <p style={{ color: "#fcd34d", margin: 0, fontSize: "13px" }}>{realTimeMatch.teamB}</p>
                <h4 style={{ margin: "8px 0 0", fontSize: "24px" }}>{realTimeMatch.scoreB}</h4>
              </div>
            </div>

            <div style={{ marginTop: "16px", color: "#d1d5db", fontSize: "14px" }}>
              Last Ball: <strong>{realTimeMatch.lastBall}</strong>
            </div>
          </div>
        </div>
      ) : null}

      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {matches.length > 0 ? (
          matches.map((match) => (
            <div key={match.id} style={cardStyle}>
              <p style={{ color: "#93c5fd", marginBottom: "8px", fontSize: "14px" }}>{match.status}</p>
              <h3 style={{ margin: "0 0 10px", fontSize: "20px" }}>{match.name}</h3>
              <p style={{ margin: "6px 0", color: "#d1d5db" }}>Venue: {match.venue}</p>
              <p style={{ margin: "6px 0" }}>{match.teamA}: {match.score}</p>
              <p style={{ margin: "6px 0" }}>{match.teamB}: {match.scoreB}</p>
            </div>
          ))
        ) : (
          <div style={{ ...cardStyle, gridColumn: "1 / -1", textAlign: "center" }}>
            <p style={{ color: "#9ca3af", margin: 0 }}>No live matches available right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMatches;
