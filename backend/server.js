const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const PORT = process.env.PORT || 5000;
const HOTSTAR_URL = "https://www.hotstar.com/in/sports/cricket";

const createMatch = (match) => ({
  hotstarUrl: HOTSTAR_URL,
  recentOvers: [],
  commentary: [],
  winProbability: { batting: 50, bowling: 50 },
  partnership: "-",
  ...match,
});

let liveMatches = [
  createMatch({
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
    overs: "18.4",
    partnership: "42 runs off 19 balls",
    recentOvers: ["1 4 1 0 6 2", "1 1 4 W 2 1", "6 1 1 2 4 0"],
    striker: { name: "S. Yadav", runs: 58, balls: 34, sr: 170.5 },
    nonStriker: { name: "H. Pandya", runs: 21, balls: 12, sr: 175.0 },
    bowler: { name: "K. Yadav", overs: "3.4", runs: 31, wickets: 1 },
    winProbability: { batting: 64, bowling: 36 },
  }),
  createMatch({
    id: "match-2",
    matchId: "match-2",
    name: "RCB vs KKR",
    status: "Innings break",
    venue: "Chinnaswamy Stadium",
    score: "182/7 (20)",
    scoreA: "182/7 (20)",
    scoreB: "Chase pending",
    teamA: "RCB",
    teamB: "KKR",
    battingTeam: "RCB",
    bowlingTeam: "KKR",
    lastBall: "W",
    required: "KKR need 183 runs in 20 overs",
    overs: "20.0",
    partnership: "21 runs off 10 balls",
    recentOvers: ["4 1 6 0 2 W", "1 1 2 0 4 1"],
    striker: { name: "V. Kohli", runs: 72, balls: 44, sr: 163.6 },
    nonStriker: { name: "M. Lomror", runs: 19, balls: 11, sr: 172.7 },
    bowler: { name: "S. Narine", overs: "4", runs: 24, wickets: 2 },
    winProbability: { batting: 52, bowling: 48 },
  }),
];

const schedule = [
  { id: 1, date: "2026-03-25", time: "7:30 PM", teams: "MI vs CSK", venue: "Mumbai", status: "Live" },
  { id: 2, date: "2026-03-26", time: "7:30 PM", teams: "RCB vs KKR", venue: "Bengaluru", status: "Upcoming" },
  { id: 3, date: "2026-03-27", time: "3:30 PM", teams: "DC vs RR", venue: "Delhi", status: "Upcoming" },
  { id: 4, date: "2026-03-28", time: "7:30 PM", teams: "SRH vs GT", venue: "Hyderabad", status: "Upcoming" },
];

const teams = [
  { id: 1, name: "Mumbai Indians", short: "MI", captain: "R. Sharma", venue: "Wankhede", form: "W-W-L-W", titles: 5 },
  { id: 2, name: "Chennai Super Kings", short: "CSK", captain: "R. Gaikwad", venue: "Chepauk", form: "W-L-W-W", titles: 5 },
  { id: 3, name: "Royal Challengers Bengaluru", short: "RCB", captain: "F. du Plessis", venue: "Chinnaswamy", form: "L-W-W-L", titles: 0 },
  { id: 4, name: "Kolkata Knight Riders", short: "KKR", captain: "S. Iyer", venue: "Eden Gardens", form: "W-W-W-L", titles: 2 },
];

const players = [
  { id: 1, name: "Suryakumar Yadav", team: "Mumbai Indians", role: "Batter", short: "SY", runs: 558, average: 43.2, strikeRate: 168.4 },
  { id: 2, name: "Virat Kohli", team: "RCB", role: "Batter", short: "VK", runs: 640, average: 53.1, strikeRate: 149.2 },
  { id: 3, name: "Jasprit Bumrah", team: "Mumbai Indians", role: "Bowler", short: "JB", runs: 0, average: 18.4, strikeRate: 0 },
  { id: 4, name: "Sunil Narine", team: "KKR", role: "All-rounder", short: "SN", runs: 228, average: 25.3, strikeRate: 172.1 },
];

const series = [
  { id: 1, name: "IPL 2026", format: "T20", matches: 74, status: "Ongoing" },
  { id: 2, name: "India vs Australia", format: "ODI", matches: 3, status: "Upcoming" },
  { id: 3, name: "Asia Cup", format: "T20I", matches: 13, status: "Scheduled" },
];

const pointsTable = [
  { id: 1, team: "Mumbai Indians", played: 8, won: 6, lost: 2, nrr: "+1.025", points: 12 },
  { id: 2, team: "Chennai Super Kings", played: 8, won: 5, lost: 3, nrr: "+0.644", points: 10 },
  { id: 3, team: "KKR", played: 8, won: 5, lost: 3, nrr: "+0.413", points: 10 },
  { id: 4, team: "RCB", played: 8, won: 4, lost: 4, nrr: "+0.125", points: 8 },
];

const news = [
  { id: 1, title: "Powerplay pressure defines tonight's batting battle", tag: "Analysis", readTime: "4 min read" },
  { id: 2, title: "Death-over strike rotation trends to watch", tag: "Numbers", readTime: "5 min read" },
  { id: 3, title: "Middle-over matchups shaping IPL strategy", tag: "Tactics", readTime: "3 min read" },
];

const commentaryStore = {
  "match-1": [
    { id: 1, over: "18.4", result: "4", text: "Full and wide, sliced over point for four." },
    { id: 2, over: "18.3", result: "1", text: "Single to long-on, smart strike rotation." },
    { id: 3, over: "18.2", result: "6", text: "Length ball pulled deep into the stands." },
  ],
  "match-2": [
    { id: 1, over: "20.0", result: "W", text: "Caught at deep midwicket on the final ball." },
  ],
};

const safeMatch = (match) => ({
  ...match,
  commentary: commentaryStore[match.matchId] || [],
});

const findMatch = (id) => liveMatches.find((x) => x.id === id || x.matchId === id);

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "CricPulse API",
    version: "2.0.0",
    liveMatches: liveMatches.length,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/dashboard", (req, res) => {
  res.json({
    featuredMatch: safeMatch(liveMatches[0]),
    liveMatches: liveMatches.map(safeMatch),
    schedule,
    pointsTable,
    news,
    series,
    topPlayers: players.slice(0, 3),
  });
});

app.get("/api/live-match", (req, res) => res.json(safeMatch(liveMatches[0])));
app.get("/api/live-matches", (req, res) => res.json(liveMatches.map(safeMatch)));
app.get("/api/match/:id", (req, res) => res.json(safeMatch(findMatch(req.params.id) || liveMatches[0])));
app.get("/api/commentary/:id", (req, res) => res.json(commentaryStore[req.params.id] || []));
app.get("/api/scorecard/:id", (req, res) => res.json(safeMatch(findMatch(req.params.id) || liveMatches[0])));
app.get("/api/schedule", (req, res) => res.json(schedule));
app.get("/api/teams", (req, res) => res.json(teams));
app.get("/api/team/:id", (req, res) => res.json(teams.find((x) => String(x.id) === String(req.params.id)) || teams[0]));
app.get("/api/players", (req, res) => res.json(players));
app.get("/api/player/:id", (req, res) => res.json(players.find((x) => String(x.id) === String(req.params.id)) || players[0]));
app.get("/api/series", (req, res) => res.json(series));
app.get("/api/points-table", (req, res) => res.json(pointsTable));
app.get("/api/news", (req, res) => res.json(news));
app.get("/api/trending", (req, res) => res.json({ teams: teams.slice(0, 3), players: players.slice(0, 3), stories: news.slice(0, 2) }));
app.get("/api/search", (req, res) => {
  const q = String(req.query.q || "").toLowerCase().trim();
  const has = (text) => String(text || "").toLowerCase().includes(q);
  if (!q) {
    return res.json({ matches: [], teams: [], players: [], news: [] });
  }
  res.json({
    matches: liveMatches.filter((x) => has(x.name) || has(x.teamA) || has(x.teamB)).map(safeMatch),
    teams: teams.filter((x) => has(x.name) || has(x.short)),
    players: players.filter((x) => has(x.name) || has(x.team)),
    news: news.filter((x) => has(x.title) || has(x.tag)),
  });
});

io.on("connection", (socket) => {
  socket.emit("dashboard:init", {
    featuredMatch: safeMatch(liveMatches[0]),
    liveMatches: liveMatches.map(safeMatch),
  });
  socket.emit("live-match-update", safeMatch(liveMatches[0]));
});

const results = ["0", "1", "2", "3", "4", "6", "W"];
let ballCounter = 4;

setInterval(() => {
  const featured = liveMatches[0];
  const result = results[Math.floor(Math.random() * results.length)];
  featured.lastBall = result;
  ballCounter += 1;
  const over = `${Math.floor(ballCounter / 6)}.${ballCounter % 6}`;
  featured.overs = over;
  featured.status = `Live - ${over} Overs`;
  featured.recentOvers = [
    `${results[Math.floor(Math.random() * results.length)]} ${results[Math.floor(Math.random() * results.length)]} ${results[Math.floor(Math.random() * results.length)]} ${results[Math.floor(Math.random() * results.length)]} ${results[Math.floor(Math.random() * results.length)]} ${results[Math.floor(Math.random() * results.length)]}`,
    ...featured.recentOvers,
  ].slice(0, 3);

  commentaryStore[featured.matchId] = [
    {
      id: Date.now(),
      over,
      result,
      text: result === "W" ? "Big wicket. Pressure swings instantly." : `Delivery results in ${result} run${result === "1" ? "" : "s"}.`,
    },
    ...(commentaryStore[featured.matchId] || []),
  ].slice(0, 12);

  io.emit("live-match-update", safeMatch(featured));
  io.emit("commentary:update", {
    matchId: featured.matchId,
    items: commentaryStore[featured.matchId],
  });
}, 5000);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
