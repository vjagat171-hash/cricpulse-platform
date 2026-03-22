// frontend/src/components/LiveMatches.jsx
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Backend ke socket server se connect kar rahe hain
const socket = io('http://localhost:5000');

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [realTimeMatch, setRealTimeMatch] = useState(null); // Socket data ke liye

  useEffect(() => {
    // 1. REST API se Real matches fetch karna
    fetch('http://localhost:5000/api/live-matches')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMatches(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching live matches:", err);
        setLoading(false);
      });

    // 2. Socket.io se Real-time data sunna (Simulation)
    socket.on('live-match-update', (data) => {
      setRealTimeMatch(data);
    });

    // Cleanup function jab component unmount ho
    return () => {
      socket.off('live-match-update');
    };
  }, []);

  if (loading) return <h2 style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Live Matches Load ho rahe hain... ⏳</h2>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', color: 'white', backgroundColor: '#121212', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#4da6ff' }}>🏏 CricPulse Dashboard</h2>

      {/* ========================================== */}
      {/* REAL-TIME SOCKET.IO MATCH (Simulation)       */}
      {/* ========================================== */}
      {realTimeMatch && (
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            border: '2px solid #00e676', 
            padding: '20px', 
            borderRadius: '12px', 
            width: '100%', 
            maxWidth: '600px',
            backgroundColor: '#1a3300',
            boxShadow: '0 0 20px rgba(0, 230, 118, 0.4)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ color: '#00e676', fontWeight: 'bold', letterSpacing: '1px' }}>🔥 FEATURED LIVE</span>
              <span style={{ backgroundColor: 'red', padding: '3px 8px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold', animation: 'blink 1s infinite' }}>{realTimeMatch.status}</span>
            </div>

            <h3 style={{ margin: '0 0 10px 0', fontSize: '22px' }}>{realTimeMatch.teamA} vs {realTimeMatch.teamB}</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#0d1a00', padding: '15px', borderRadius: '8px' }}>
              <div>
                <p style={{ margin: '0', color: '#aaa', fontSize: '14px' }}>{realTimeMatch.teamA}</p>
                <h2 style={{ margin: '5px 0 0 0', color: '#fff' }}>{realTimeMatch.scoreA}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0', color: '#aaa', fontSize: '14px' }}>{realTimeMatch.teamB}</p>
                <h2 style={{ margin: '5px 0 0 0', color: '#fff' }}>{realTimeMatch.scoreB}</h2>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#aaa', fontSize: '14px' }}>Last Ball: </span>
                <span style={{ 
                  backgroundColor: realTimeMatch.lastBall === 'W' ? 'red' : realTimeMatch.lastBall === '6' || realTimeMatch.lastBall === '4' ? '#00e676' : '#444', 
                  padding: '5px 10px', borderRadius: '50%', fontWeight: 'bold' 
                }}>
                  {realTimeMatch.lastBall}
                </span>
              </div>
              <div style={{ fontSize: '14px' }}>
                <span style={{ color: '#aaa' }}>Odds: </span>
                <span style={{ color: '#4da6ff', marginRight: '10px' }}>{realTimeMatch.teamA.split(' ')[0]}: {realTimeMatch.oddsA}</span>
                <span style={{ color: '#ffb84d' }}>{realTimeMatch.teamB.split(' ')[0]}: {realTimeMatch.oddsB}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <hr style={{ borderColor: '#333', marginBottom: '30px' }} />

      {/* ========================================== */}
      {/* REAL API MATCHES (CricAPI)                   */}
      {/* ========================================== */}
      <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#aaa' }}>🌍 Global Live Matches</h3>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {matches.map((match) => {
          const isLive = match.matchStarted && !match.matchEnded;
          return (
            <div key={match.id} style={{ 
              border: isLive ? '1px solid #ff4d4d' : '1px solid #333', 
              padding: '20px', borderRadius: '12px', minWidth: '320px', maxWidth: '400px',
              backgroundColor: '#1e1e1e'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ color: '#aaa', fontSize: '12px', fontWeight: 'bold' }}>{match.matchType}</span>
                {isLive && <span style={{ backgroundColor: '#ff4d4d', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>🔴 LIVE</span>}
              </div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{match.name}</h4>
              <p style={{ color: '#ffcc00', fontSize: '13px', margin: '0 0 15px 0' }}>{match.status}</p>
              
              {match.score && match.score.length > 0 ? (
                <div style={{ backgroundColor: '#2a2a2a', padding: '12px', borderRadius: '8px' }}>
                  {match.score.map((inning, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: index !== match.score.length - 1 ? '5px' : '0' }}>
                      <strong style={{ color: '#ddd', fontSize: '14px' }}>{inning.inning.replace(' Inning', '')}</strong>
                      <strong style={{ color: '#fff', fontSize: '15px' }}>{inning.r}/{inning.w} <span style={{ color: '#aaa', fontSize: '12px' }}>({inning.o} ov)</span></strong>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ backgroundColor: '#2a2a2a', padding: '12px', borderRadius: '8px', color: '#888', textAlign: 'center', fontSize: '13px' }}>Scores not available yet</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveMatches;