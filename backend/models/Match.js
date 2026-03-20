const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    matchId: { type: String, required: true }, // API se aane wala ID
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    status: { type: String, default: "Upcoming" }, // Upcoming, Live, Completed
    liveScore: { type: String, default: "" },
    odds: {
        team1Win: Number,
        team2Win: Number
    }
});

module.exports = mongoose.model('Match', matchSchema);