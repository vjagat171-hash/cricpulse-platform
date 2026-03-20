const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get live matches from 3rd party API
router.get('/live-matches', async (req, res) => {
    try {
        // Dummy API URL - Replace with actual CricAPI/RapidAPI endpoint
        const response = await axios.get('https://api.cricapi.com/v1/currentMatches?apikey=YOUR_API_KEY');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching live data" });
    }
});

module.exports = router;