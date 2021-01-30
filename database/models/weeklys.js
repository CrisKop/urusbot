const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
weekly: { type: String }
});

module.exports = mongoose.model('weeklys', LevelSchema);