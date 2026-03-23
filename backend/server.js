const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.CRICKET_API_KEY;

const schedule = [
  {
    id: 1,
    date: "2026-03-22",
    time: "7:30 PM",
    teams: "Mumbai Mavericks vs Delhi Dynamos",
    venue: "Wankhede Stadium",
    status: "Live",
  },
  {
    id: 2,
    date: "2026-03-23",
    time: "3:30 PM",
    teams: "Chennai Kings vs Bengaluru Blasters",
    venue: "Chepauk",
    status: "Upcoming",
  },
];

const teams = [
  {
    id: 1,
    name: "Mumbai Mavericks",
    short: "MM",
    captain: "R. Sharma",
    venue: "Wankhede Stadium",
    form: "W-W-L-W",
  },
  {
    id: 2,
    name: "Delhi Dynamos",
    short: "DD",
    captain: "R. Pant",
    venue: "Arun Jaitley Stadium",
    form: "L-W-W-L",
  },
];

const news = [
  {
    id: 1,
    title: "Powerplay pressure defines tonight's batting battle",
    tag: "Analysis",
    readTime: "4 min read",
  },
  {
    id: 2,
    title: "Death-over strike rotation trends to watch",
    tag: "Numbers",
    readTime: "5 min read",
  },
];

const fallbackMatches = [
  {
    id: "fallback-1",
    name: "Mumbai Indians vs Chennai Super Kings",
    status: "Live",
    venue: "Wankhede Stadium",
    score: "168/4 (18.4)",
    scoreB: "Yet to bat",
    teamA: "Mumbai Indians",
    teamB: "Chennai Super Kings",
    lastBall: "4",
  },
];

let featuredLiveMatch = {
  matchId: "fallback-1",
  teamA: "Mumbai Indians",
  teamB: "Chennai Super Kings",
  battingTeam: "Mumbai Indians",
  bowlingTeam: "Chennai Super Kings",
  venue: "Wankhede Stadium",
  score: "168/4",
  scoreA: "168/4 (18.4)",
  scoreB: "Yet to bat",
  overs: "18.4",
  required: "Need 24 runs in 8 balls",
  striker: { name: "S. Yadav", runs: 58, balls: 34, sr: 170.5 },
  nonStriker: { name: "H. Pandya", runs: 21, balls: 12, sr: 175.0 },
  bowler: { name: "K. Yadav", overs: "3.4", runs: 31, wickets: 1 },
  partnership: "42 runs off 19 balls",
  recentOvers: ["1 4 1 0 6 2", "1 1 4 W 2 1", "6 1 1 2 4 0"],
  winProbability: { batting: 64, bowling: 36 },
  status: "Live - 18.4 Overs",
  lastBall: "4",
  embedUrl: "",
};

function normalizeCricApiMatch(match, index = 0) {
  const matchTeams = Array.isArray(match.teams) ? match.teams : [];
  const scores = Array.isArray(match.score) ? match.score : [];

  const teamA = matchTeams[0] || match?.teamInfo?.[0]?.name || "Team A";
  const teamB = matchTeams[1] || match?.teamInfo?.[1]?.name || "Team B";

  const scoreA = scores[0]
    ? `${scores[0].r}/${scores[0].w} (${scores[0].o})`
    : "Yet to bat";

  const scoreB = scores[1]
    ? `${scores[1].r}/${scores[1].w} (${scores[1].o})`
    : "Yet to bat";

  return {
    id: match.id || `match-${index}`,
    name: `${teamA} vs ${teamB}`,
    status: match.status || "Live",
    venue: match.venue || "Venue TBA",
    score: scoreA,
    scoreB,
    teamA,
    teamB,
    battingTeam: teamA,
    bowlingTeam: teamB,
    lastBall: "Live",
  };
}

async function fetchCurrentMatches() {
  try {
    if (!API_KEY) {
      console.log("CRICKET_API_KEY missing, using fallback matches");
      return fallbackMatches;
    }

    const response = await axios.get("https://api.cricapi.com/v1/currentMatches", {
      params: {
        apikey: API_KEY,
        offset: 0,
      },
      timeout: 10000,
    });

    const list = Array.isArray(response.data?.data) ? response.data.data : [];

    if (!list.length) {
      console.log("No live matches from API, using fallback matches");
      return fallbackMatches;
    }

    return list.map((match, index) => normalizeCricApiMatch(match, index));
  } catch (error) {
    console.error("fetchCurrentMatches error:", error.response?.data || error.message);
    return fallbackMatches;
  }
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    apiKeyPresent: Boolean(API_KEY),
  });
});

app.get("/api/live-matches", async (req, res) => {
  const matches = await fetchCurrentMatches();
  res.json(matches);
});

app.get("/api/live-match", async (req, res) => {
  const matches = await fetchCurrentMatches();
  const firstMatch = matches[0] || fallbackMatches[0];

  featuredLiveMatch = {
    ...featuredLiveMatch,
    matchId: firstMatch.id,
    teamA: firstMatch.teamA,
    teamB: firstMatch.teamB,
    battingTeam: firstMatch.teamA,
    bowlingTeam: firstMatch.teamB,
    venue: firstMatch.venue || featuredLiveMatch.venue,
    score: firstMatch.score,
    scoreA: firstMatch.score,
    scoreB: firstMatch.scoreB,
    status: firstMatch.status,
    lastBall: firstMatch.lastBall || featuredLiveMatch.lastBall,
    embedUrl: "",
  };

  res.json(featuredLiveMatch);
});

app.get("/api/schedule", (req, res) => {
  res.json(schedule);
});

app.get("/api/teams", (req, res) => {
  res.json(teams);
});

app.get("/api/news", (req, res) => {
  res.json(news);
});

io.on("connection", (socket) => {
  socket.emit("live-match-update", featuredLiveMatch);
});

setInterval(() => {
  const lastBall = ["0", "1", "2", "4", "6", "W"][Math.floor(Math.random() * 6)];
  featuredLiveMatch = {
    ...featuredLiveMatch,
    lastBall,
  };
  io.emit("live-match-update", featuredLiveMatch);
}, 5000);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
