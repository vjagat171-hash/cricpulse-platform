const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

// HTTP server aur Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] } // Vite ka default port
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Simulation: Real-time API ya database se data aane ka natak (mock data)
    // Asli project mein aap yahan Sportradar ya CricAPI ka live data pass karenge
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
    }, 2000); // Har 2 second mein naya data bhejega

    socket.on('disconnect', () => {
        console.log('User Disconnected');
        clearInterval(liveMatchInterval);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Live Server running on http://localhost:${PORT}`);
});