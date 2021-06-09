const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	if(!message.member.roles.cache.has('851717791714115586')) return message.channel.send(new MessageEmbed().setTitle('Error').setDescription('You need the <@&851717791714115586> role to use this command.').setTimestamp().setColor('RANDOM'));
	process.exit(1);
};


module.exports.config = {
	name: 'restart',
	description: 'restarts bot cuz fail lolololol',
	usage: '!!restart',
	botPerms: [],
	userPerms: ['ADMINISTRATOR'],
	aliases: ['failure', 'bruh'],
};