const { Schema, model } = require('mongoose');

const schema = new Schema({
	guildID: { type: String, required: true },
	userID: { type: String, required: true },
	xp: { type: Number, required: true },
});

module.exports = model('XP', schema);