import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LivePage from "./pages/LivePage";
import SchedulePage from "./pages/SchedulePage";
import TeamsPage from "./pages/TeamsPage";
import NewsPage from "./pages/NewsPage";
import NotFoundPage from "./pages/NotFoundPage";
import LiveMatches from "./components/LiveMatches";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const fallbackData = {
  liveMatch: {
    id: 1,
    matchId: "fallback-1",
    status: "Live · 2nd Innings",
    venue: "Wankhede Stadium, Mumbai",
    battingTeam: "Mumbai Mavericks",
    bowlingTeam: "Delhi Dynamos",
    teamA: "Mumbai Mavericks",
    teamB: "Delhi Dynamos",
    score: "168/4",
    scoreA: "168/4 (17.2)",
    scoreB: "Yet to bat",
    overs: "17.2",
    required: "Need 24 runs in 16 balls",
    striker: { name: "S. Yadav", runs: 58, balls: 34, sr: 170.5 },
    nonStriker: { name: "H. Pandya", runs: 21, balls: 12, sr: 175.0 },
    bowler: { name: "K. Yadav", overs: "3.2", runs: 28, wickets: 1 },
    partnership: "42 runs off 19 balls",
    recentOvers: ["1 4 1 0 6 2", "1 1 4 W 2 1", "6 1 1 2 4 0"],
    winProbability: { batting: 64, bowling: 36 },
    lastBall: "4",
  },
  schedule: [
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
  ],
  teams: [
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
  ],
  news: [
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
  ],
};

const normalizeLiveMatch = (data) => {
  if (!data) return fallbackData.liveMatch;

  const teamA = data.teamA || data.battingTeam || fallbackData.liveMatch.teamA;
  const teamB = data.teamB || data.bowlingTeam || fallbackData.liveMatch.teamB;
  const scoreA = data.scoreA || data.score || fallbackData.liveMatch.scoreA;
  const scoreB = data.scoreB || fallbackData.liveMatch.scoreB;

  return {
    ...fallbackData.liveMatch,
    ...data,
    teamA,
    teamB,
    battingTeam: data.battingTeam || teamA,
    bowlingTeam: data.bowlingTeam || teamB,
    score: data.score || scoreA,
    scoreA,
    scoreB,
    recentOvers: Array.isArray(data.recentOvers)
      ? data.recentOvers
      : fallbackData.liveMatch.recentOvers,
    winProbability: data.winProbability || fallbackData.liveMatch.winProbability,
  };
};

export default function App() {
  const [liveMatch, setLiveMatch] = useState(fallbackData.liveMatch);
  const [schedule, setSchedule] = useState(fallbackData.schedule);
  const [teams, setTeams] = useState(fallbackData.teams);
  const [news, setNews] = useState(fallbackData.news);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const socket = useMemo(
    () => io(API_BASE_URL, { transports: ["websocket", "polling"] }),
    []
  );

  useEffect(() => {
    let active = true;

    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError("");

        const [liveRes, scheduleRes, teamsRes, newsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/live-match`),
          fetch(`${API_BASE_URL}/api/schedule`),
          fetch(`${API_BASE_URL}/api/teams`),
          fetch(`${API_BASE_URL}/api/news`),
        ]);

        const liveData = liveRes.ok ? await liveRes.json() : fallbackData.liveMatch;
        const scheduleData = scheduleRes.ok ? await scheduleRes.json() : fallbackData.schedule;
        const teamsData = teamsRes.ok ? await teamsRes.json() : fallbackData.teams;
        const newsData = newsRes.ok ? await newsRes.json() : fallbackData.news;

        if (!active) return;

        setLiveMatch(normalizeLiveMatch(liveData));
        setSchedule(Array.isArray(scheduleData) ? scheduleData : fallbackData.schedule);
        setTeams(Array.isArray(teamsData) ? teamsData : fallbackData.teams);
        setNews(Array.isArray(newsData) ? newsData : fallbackData.news);
      } catch (err) {
        if (!active) return;
        setError("Live server unavailable, fallback data is being used.");
        setLiveMatch(fallbackData.liveMatch);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadInitialData();

    socket.on("connect_error", () => {
      setError((prev) => prev || "Realtime server not connected. Static fallback is active.");
    });

    socket.on("live-match-update", (payload) => {
      if (!active || !payload) return;
      setLiveMatch((prev) => normalizeLiveMatch({ ...prev, ...payload }));
    });

    return () => {
      active = false;
      socket.off("connect_error");
      socket.off("live-match-update");
      socket.disconnect();
    };
  }, [socket]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />

        {error ? (
          <div className="border-b border-amber-400/20 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-200">
            {error}
          </div>
        ) : null}

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/live" element={<LivePage match={liveMatch} loading={loading} />} />
            <Route path="/live-matches" element={<LiveMatches />} />
            <Route path="/schedule" element={<SchedulePage schedule={schedule} />} />
            <Route path="/teams" element={<TeamsPage teams={teams} />} />
            <Route path="/news" element={<NewsPage news={news} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
