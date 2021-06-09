const Discord = require('discord.js');
// const xp = require('../functions/lb');

module.exports.run = async (client, message, args) => {
	// const lb = await xp.calculateLeaderboard(client, 10);

	// const embed = new Discord.MessageEmbed()
	// 	.addField('What are the points for? \n ', 'You get points for afk-ing on https://afk.nuggetdev.com/ \n _ _')
	// 	.addField('what to do with these points? \n', 'the top 3 people with the most points at the end of the month will get amazing prizes like **Discord Nitro** :smirk: \n _ _')
	// 	.addField('Points:', `${lb}`)
	// 	.setTitle('Global Points Leaderboard')
	// 	.setTimestamp()
	// 	.setColor('RANDOM');
	// message.channel.send(embed);
};

module.exports.config = {
	name: 'leaderboard',
	description: 'Shows the leaderboard for 24/7 stage',
	usage: '!!lb',
	botPerms: [],
	userPerms: ['SEND_MESSAGES'],
	aliases: ['lb'],
};