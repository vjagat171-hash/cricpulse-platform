const express = require("express");
const axios = require("axios");
const { getLiveMatches, fallbackMatches } = require("../services/aggregator.service");

const router = express.Router();

// Direct API call route (CricAPI/RapidAPI)
router.get("/live-matches-api", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.cricapi.com/v1/currentMatches?apikey=14c3542c-237f-4762-abd4-715eff46b9ec"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching live data" });
  }
});

// Aggregator service route - returns all matches
router.get("/live-matches", async (req, res) => {
  const matches = await getLiveMatches();
  res.json(matches);
});

// Aggregator service route - returns single match with fallback
router.get("/live-match", async (req, res) => {
  const matches = await getLiveMatches();
  res.json(matches[0] || fallbackMatches[0]);
});

module.exports = router;
