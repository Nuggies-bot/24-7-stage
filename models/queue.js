const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	guildID: String,
	songs: Array,
});

module.exports = mongoose.model('songQueue', Schema);
