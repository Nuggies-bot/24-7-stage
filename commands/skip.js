const { MessageEmbed } = require('discord.js');
const Schema = require('../models/queue');
module.exports.run = async (client, message, args) => {
	const data = await Schema.findOne({ guildID: message.guild.id });
	if(data.songs[0]) client.queue.play(message);
};


module.exports.config = {
	name: 'skip',
	description: 'skip a song!',
	usage: '!!skip',
	botPerms: [],
	userPerms: [],
	aliases: ['s', 'next'],
};
