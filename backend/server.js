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

const fallbackMatches = [
  {
    id: "fallback-1",
    name: "Mumbai Mavericks vs Delhi Dynamos",
    title: "Mumbai Mavericks vs Delhi Dynamos",
    status: "Live",
    venue: "Wankhede Stadium",
    score: "168/4",
    scoreA: "168/4 (18.4)",
    scoreB: "Yet to bat",
    teamA: "Mumbai Mavericks",
    teamB: "Delhi Dynamos",
    battingTeam: "Mumbai Mavericks",
    bowlingTeam: "Delhi Dynamos",
    lastBall: "4",
  },
];

let featuredLiveMatch = {
  matchId: "fallback-1",
  id: "fallback-1",
  teamA: "Mumbai Mavericks",
  teamB: "Delhi Dynamos",
  battingTeam: "Mumbai Mavericks",
  bowlingTeam: "Delhi Dynamos",
  venue: "Wankhede Stadium",
  scoreA: "168/4 (18.4)",
  scoreB: "Yet to bat",
  score: "168/4",
  overs: "18.4",
  status: "Live - 18.4 Overs",
  lastBall: "4",
  required: "Need 24 runs in 16 balls",
  striker: { name: "S. Yadav", runs: 58, balls: 34, sr: 170.6 },
  nonStriker: { name: "H. Pandya", runs: 21, balls: 12, sr: 175.0 },
  bowler: { name: "K. Yadav", overs: "3.4", runs: 28, wickets: 1 },
  partnership: "42 runs off 19 balls",
  recentOvers: ["1 4 1 0 6 2", "1 1 4 W 2 1", "6 1 1 2 4 0"],
  winProbability: { batting: 64, bowling: 36 },
  oddsA: "1.62",
  oddsB: "2.22",
  embedUrl: "https://www.youtube.com/embed/LIVE_VIDEO_ID?autoplay=0&rel=0",
};

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

function toNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function parseScore(scoreText = "0/0") {
  const [runs, wickets] = String(scoreText).split("/");
  return {
    runs: toNumber(runs, 0),
    wickets: toNumber(wickets, 0),
  };
}

function parseOvers(oversText = "0.0") {
  const [over, ball] = String(oversText).split(".");
  return {
    over: toNumber(over, 0),
    ball: toNumber(ball, 0),
  };
}

function formatStrikeRate(runs, balls) {
  if (!balls) return 0;
  return Number(((runs / balls) * 100).toFixed(1));
}

function normalizeCricApiMatch(match, index = 0) {
  const teamsArr = Array.isArray(match.teams) ? match.teams : [];
  const scores = Array.isArray(match.score) ? match.score : [];

  const teamA =
    teamsArr[0] ||
    match?.teamInfo?.[0]?.name ||
    match.event_home_team ||
    "Team A";

  const teamB =
    teamsArr[1] ||
    match?.teamInfo?.[1]?.name ||
    match.event_away_team ||
    "Team B";

  const scoreA = scores[0]
    ? `${scores[0].r}/${scores[0].w} (${scores[0].o})`
    : match.event_home_final_result || "Yet to bat";

  const scoreB = scores[1]
    ? `${scores[1].r}/${scores[1].w} (${scores[1].o})`
    : match.event_away_final_result || "Yet to bat";

  const score = scores[0]
    ? `${scores[0].r}/${scores[0].w}`
    : match.event_home_final_result || "0/0";

  const overs = scores[0]?.o ? String(scores[0].o) : featuredLiveMatch.overs;

  return {
    id: match.id || match.event_key || `match-${index}`,
    name: `${teamA} vs ${teamB}`,
    title: `${teamA} vs ${teamB}`,
    status: match.status || match.event_status_info || "Live",
    venue: match.venue || match.event_stadium || "Venue TBA",
    score,
    scoreA,
    scoreB,
    overs,
    teamA,
    teamB,
    battingTeam: teamA,
    bowlingTeam: teamB,
    lastBall: "Live",
    raw: match,
  };
}

function normalizeApiCricketMatch(match, index = 0) {
  const home = match.event_home_team || "Team A";
  const away = match.event_away_team || "Team B";
  const homeScore = match.event_home_final_result || "0/0";
  const awayScore = match.event_away_final_result || "Yet to bat";

  return {
    id: match.event_key || `live-${index}`,
    name: `${home} vs ${away}`,
    title: `${home} vs ${away}`,
    battingTeam: home,
    bowlingTeam: away,
    teamA: home,
    teamB: away,
    venue: match.event_stadium || "Venue TBA",
    status: match.event_status_info || match.event_status || "Live",
    score: homeScore,
    scoreA: homeScore,
    scoreB: awayScore,
    overs: featuredLiveMatch.overs,
    lastBall: "Live",
    raw: match,
  };
}

async function fetchCurrentMatches() {
  if (!API_KEY) {
    console.log("CRICKET_API_KEY missing, using fallback matches");
    return fallbackMatches;
  }

  try {
    const apiCricketUrl = `https://api.api-cricket.com/?method=get_livescore&APIkey=${API_KEY}`;
    const apiCricketResp = await axios.get(apiCricketUrl, { timeout: 10000 });
    const apiCricketList = Array.isArray(apiCricketResp.data?.result)
      ? apiCricketResp.data.result
      : [];

    if (apiCricketList.length) {
      return apiCricketList.map((match, index) =>
        normalizeApiCricketMatch(match, index)
      );
    }

    const cricApiResp = await axios.get(
      "https://api.cricapi.com/v1/currentMatches",
      {
        params: {
          apikey: API_KEY,
          offset: 0,
        },
        timeout: 10000,
      }
    );

    const cricApiList = Array.isArray(cricApiResp.data?.data)
      ? cricApiResp.data.data
      : [];

    if (cricApiList.length) {
      return cricApiList.map((match, index) =>
        normalizeCricApiMatch(match, index)
      );
    }

    console.log("No live matches from API, using fallback matches");
    return fallbackMatches;
  } catch (error) {
    console.error(
      "fetchCurrentMatches error:",
      error.response?.data || error.message
    );
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
  try {
    const matches = await fetchCurrentMatches();
    res.json(matches);
  } catch (error) {
    console.error(
      "live-matches error:",
      error.response?.data || error.message
    );
    res.json(fallbackMatches);
  }
});

app.get("/api/live-match", async (req, res) => {
  try {
    const matches = await fetchCurrentMatches();
    const firstMatch =
      Array.isArray(matches) && matches.length ? matches[0] : fallbackMatches[0];

    featuredLiveMatch = {
      ...featuredLiveMatch,
      matchId: firstMatch.id || featuredLiveMatch.matchId,
      id: firstMatch.id || featuredLiveMatch.id,
      teamA: firstMatch.teamA || featuredLiveMatch.teamA,
      teamB: firstMatch.teamB || featuredLiveMatch.teamB,
      battingTeam: firstMatch.battingTeam || firstMatch.teamA || featuredLiveMatch.battingTeam,
      bowlingTeam: firstMatch.bowlingTeam || firstMatch.teamB || featuredLiveMatch.bowlingTeam,
      venue: firstMatch.venue || featuredLiveMatch.venue,
      score: firstMatch.score || featuredLiveMatch.score,
      scoreA: firstMatch.scoreA || featuredLiveMatch.scoreA,
      scoreB: firstMatch.scoreB || featuredLiveMatch.scoreB,
      overs: firstMatch.overs || featuredLiveMatch.overs,
      status: firstMatch.status || featuredLiveMatch.status,
      lastBall: firstMatch.lastBall || featuredLiveMatch.lastBall,
      embedUrl:
        req.query.embedUrl ||
        process.env.LIVE_EMBED_URL ||
        featuredLiveMatch.embedUrl,
    };

    res.json(featuredLiveMatch);
  } catch (error) {
    console.error("live-match error:", error.response?.data || error.message);
    res.json(featuredLiveMatch);
  }
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

  socket.on("request-featured", () => {
    socket.emit("live-match-update", featuredLiveMatch);
  });
});

setInterval(() => {
  const ballOutcomes = [0, 1, 1, 2, 4, 6];
  const runs = ballOutcomes[Math.floor(Math.random() * ballOutcomes.length)];
  const wicket = Math.random() > 0.94 ? 1 : 0;

  const currentScore = parseScore(featuredLiveMatch.score);
  const currentOvers = parseOvers(featuredLiveMatch.overs);

  let nextBall = currentOvers.ball + 1;
  let nextOver = currentOvers.over;

  if (nextBall > 5) {
    nextOver += 1;
    nextBall = 0;
  }

  const newRuns = currentScore.runs + runs;
  const newWickets = Math.min(currentScore.wickets + wicket, 10);

  let striker = { ...featuredLiveMatch.striker };
  let nonStriker = { ...featuredLiveMatch.nonStriker };

  striker.runs += runs;
  striker.balls += 1;
  striker.sr = formatStrikeRate(striker.runs, striker.balls);

  let bowlerOvers = parseOvers(featuredLiveMatch.bowler.overs);
  let bowlerNextBall = bowlerOvers.ball + 1;
  let bowlerNextOver = bowlerOvers.over;

  if (bowlerNextBall > 5) {
    bowlerNextOver += 1;
    bowlerNextBall = 0;
  }

  let bowler = {
    ...featuredLiveMatch.bowler,
    overs: `${bowlerNextOver}.${bowlerNextBall}`,
    runs: featuredLiveMatch.bowler.runs + runs,
    wickets: featuredLiveMatch.bowler.wickets + wicket,
  };

  if (runs % 2 === 1) {
    [striker, nonStriker] = [nonStriker, striker];
  }

  if (nextBall === 0) {
    [striker, nonStriker] = [nonStriker, striker];
  }

  const target = 200;
  const ballsBowled = nextOver * 6 + nextBall;
  const ballsLeft = Math.max(120 - ballsBowled, 0);
  const runsNeeded = Math.max(target - newRuns, 0);

  const battingWin = Math.min(
    95,
    Math.max(
      5,
      featuredLiveMatch.winProbability.batting +
        (wicket ? -6 : runs >= 4 ? 2 : runs === 0 ? -1 : 1)
    )
  );

  featuredLiveMatch = {
    ...featuredLiveMatch,
    score: `${newRuns}/${newWickets}`,
    scoreA: `${newRuns}/${newWickets} (${nextOver}.${nextBall})`,
    overs: `${nextOver}.${nextBall}`,
    status: `Live - ${nextOver}.${nextBall} Overs`,
    striker,
    nonStriker,
    bowler,
    partnership: `${striker.runs + nonStriker.runs} runs`,
    recentOvers: [
      `${wicket ? "W" : runs} ${Math.floor(Math.random() * 2)} ${Math.floor(
        Math.random() * 3
      )} ${Math.random() > 0.7 ? 4 : 1} ${Math.random() > 0.85 ? 6 : 0} ${
        Math.random() > 0.92 ? "W" : 1
      }`,
      ...featuredLiveMatch.recentOvers,
    ].slice(0, 3),
    lastBall: wicket ? "W" : String(runs),
    required:
      ballsLeft > 0
        ? `Need ${runsNeeded} runs in ${ballsLeft} balls`
        : runsNeeded > 0
        ? `Innings complete`
        : `Target achieved`,
    winProbability: {
      batting: battingWin,
      bowling: 100 - battingWin,
    },
  };

  io.emit("live-match-update", featuredLiveMatch);
}, 7000);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
