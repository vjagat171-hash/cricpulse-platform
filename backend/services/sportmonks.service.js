const axios = require("axios");
const { normalizeSportmonksMatch } = require("../utils/normalize");

async function getSportmonksLiveMatches() {
  const apiKey = process.env.SPORTMONKS_API_KEY;
  if (!apiKey) return [];

  const response = await axios.get("https://cricket.sportmonks.com/api/v2.0/fixtures/live", {
    params: { api_token: apiKey },
    timeout: 10000,
  });

  const list = Array.isArray(response.data?.data) ? response.data.data : [];
  return list.map((match, index) => normalizeSportmonksMatch(match, index));
}

module.exports = { getSportmonksLiveMatches };
