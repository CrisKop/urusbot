const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
guildID: { type: String },
userID: { type: String },
work: { type: String },
daily: { type: String },
fish: { type: String }
});

module.exports = mongoose.model('cooldowns', LevelSchema);