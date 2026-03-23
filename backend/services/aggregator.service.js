const { getCricApiMatches } = require("./cricapi.service");
const { getSportmonksLiveMatches } = require("./sportmonks.service");

const fallbackMatches = [
  {
    id: "fallback-1",
    source: "fallback",
    teamA: "Mumbai Indians",
    teamB: "Chennai Super Kings",
    name: "Mumbai Indians vs Chennai Super Kings",
    venue: "Wankhede Stadium",
    status: "Live",
    scoreA: "168/4 (18.4)",
    scoreB: "Yet to bat",
    battingTeam: "Mumbai Indians",
    bowlingTeam: "Chennai Super Kings",
    recentOvers: ["1 4 1 0 6 2", "1 1 4 W 2 1"],
    striker: { name: "S. Yadav", runs: 58, balls: 34, sr: 170.5 },
    nonStriker: { name: "H. Pandya", runs: 21, balls: 12, sr: 175.0 },
    bowler: { name: "K. Yadav", overs: "3.4", runs: 31, wickets: 1 },
  },
];

async function getLiveMatches() {
  try {
    const cricapi = await getCricApiMatches();
    if (cricapi.length) return cricapi;
  } catch (e) {}

  try {
    const sportmonks = await getSportmonksLiveMatches();
    if (sportmonks.length) return sportmonks;
  } catch (e) {}

  return fallbackMatches;
}

module.exports = { getLiveMatches, fallbackMatches };
