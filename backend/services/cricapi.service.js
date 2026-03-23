const axios = require("axios");
const { normalizeCricApiMatch } = require("../utils/normalize");

async function getCricApiMatches() {
  const apiKey = process.env.CRICKET_API_KEY;
  if (!apiKey) return [];

  const response = await axios.get("https://api.cricapi.com/v1/currentMatches", {
    params: { apikey: apiKey, offset: 0 },
    timeout: 10000,
  });

  const list = Array.isArray(response.data?.data) ? response.data.data : [];
  return list.map((match, index) => normalizeCricApiMatch(match, index));
}

module.exports = { getCricApiMatches };
