const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
guildID: { type: String },
userID: {type:String},
nametag: {type:String},
totalmoney: {type: String},
bank: {type:String},
cash: {type:String}
});

module.exports = mongoose.model('money', LevelSchema);