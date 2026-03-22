// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios'); // Asli API se data mangwane ke liye

const app = express();

// Middleware setup
app.use(cors()); // Frontend ko allow karne ke liye
app.use(express.json());

// Yahan apni poori copy ki hui API key daalein
const API_KEY = '14c3542c-237f-4762-YAHAN_AAGE_KI_KEY_HOGI'; 

// HTTP server aur Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: { 
        origin: "http://localhost:5173", // Vite ka default port
        methods: ["GET", "POST"] 
    }
});

// ==========================================
// 1. REST API Endpoint (Real Live Matches Data via CricAPI)
// ==========================================
app.get('/api/live-matches', async (req, res) => {
  try {
    const url = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`;
    const response = await axios.get(url);
    
    // API se aaya data frontend ko bhej rahe hain
    res.json(response.data.data); 
    
  } catch (error) {
    console.error("Live match fetch karne mein error:", error.message);
    res.status(500).json({ error: "Failed to fetch live matches" });
  }
});

// ==========================================
// 2. Socket.io (Real-time Updates Simulation)
// ==========================================
io.on('connection', (socket) => {
    console.log(`🟢 User Connected: ${socket.id}`);

    // Simulation: Har 2 second mein real-time data emit karega
    const liveMatchInterval = setInterval(() => {
        const liveData = {
            matchId: "IPL_FINAL_01",
            teamA: "Mumbai Indians",
            teamB: "Chennai Super Kings",
            scoreA: `18${Math.floor(Math.random() * 9)}/4`, // Randomize last digit for live feel
            scoreB: "Yet to bat",
            oddsA: (1.5 + Math.random() * 0.2).toFixed(2), // Dynamic odds
            oddsB: (2.1 + Math.random() * 0.2).toFixed(2),
            status: "Live - 18.4 Overs",
            lastBall: ["1", "4", "6", "W", "0"][Math.floor(Math.random() * 5)]
        };

        // Emit data to all connected React clients
        socket.emit('live-match-update', liveData);
    }, 2000); 

    // User disconnect hone par interval clear karein
    socket.on('disconnect', () => {
        console.log(`🔴 User Disconnected: ${socket.id}`);
        clearInterval(liveMatchInterval);
    });
});

// ==========================================
// 3. Start the Server
// ==========================================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Final Server running on http://localhost:${PORT}`);
});