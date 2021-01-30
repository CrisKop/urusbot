const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
daily: { type: String }
});

module.exports = mongoose.model('dailys', LevelSchema);