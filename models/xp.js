const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	id: String,
	points: Number,
});

module.exports = mongoose.model('Afk', Schema);