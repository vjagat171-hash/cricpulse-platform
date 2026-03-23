function normalizeCricApiMatch(match, index = 0) {
  const teams = Array.isArray(match.teams) ? match.teams : [];
  const scores = Array.isArray(match.score) ? match.score : [];

  const teamA = teams[0] || match?.teamInfo?.[0]?.name || "Team A";
  const teamB = teams[1] || match?.teamInfo?.[1]?.name || "Team B";

  return {
    id: match.id || `cricapi-${index}`,
    source: "cricapi",
    teamA,
    teamB,
    name: `${teamA} vs ${teamB}`,
    venue: match.venue || "Venue TBA",
    status: match.status || "Live",
    scoreA: scores[0] ? `${scores[0].r}/${scores[0].w} (${scores[0].o})` : "Yet to bat",
    scoreB: scores[1] ? `${scores[1].r}/${scores[1].w} (${scores[1].o})` : "Yet to bat",
    battingTeam: teamA,
    bowlingTeam: teamB,
    recentOvers: [],
    striker: null,
    nonStriker: null,
    bowler: null,
  };
}

function normalizeSportmonksMatch(match, index = 0) {
  const localTeam = match?.localteam?.name || match?.participants?.[0]?.name || "Team A";
  const visitorTeam = match?.visitorteam?.name || match?.participants?.[1]?.name || "Team B";

  return {
    id: match.id || `sportmonks-${index}`,
    source: "sportmonks",
    teamA: localTeam,
    teamB: visitorTeam,
    name: `${localTeam} vs ${visitorTeam}`,
    venue: match?.venue?.name || "Venue TBA",
    status: match?.status || "Live",
    scoreA: match?.runs?.[0]
      ? `${match.runs[0].score}/${match.runs[0].wickets} (${match.runs[0].overs})`
      : "Yet to bat",
    scoreB: match?.runs?.[1]
      ? `${match.runs[1].score}/${match.runs[1].wickets} (${match.runs[1].overs})`
      : "Yet to bat",
    battingTeam: localTeam,
    bowlingTeam: visitorTeam,
    recentOvers: [],
    striker: null,
    nonStriker: null,
    bowler: null,
  };
}

module.exports = {
  normalizeCricApiMatch,
  normalizeSportmonksMatch,
};
