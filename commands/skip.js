const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	client.queue._skipSong();
	if(client.queue.queue[0]) client.queue.play(client.queue.queue[0]);
};


module.exports.config = {
	name: 'restart',
	description: 'restarts bot cuz fail lolololol',
	usage: '!!restart',
	botPerms: [],
	userPerms: ['ADMINISTRATOR'],
	aliases: ['failure', 'bruh'],
};