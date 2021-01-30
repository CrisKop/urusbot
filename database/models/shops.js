const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
guildID: { type: String },
items: {type:Object}
});

module.exports = mongoose.model('shops', LevelSchema);