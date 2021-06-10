const Discord = require('discord.js');
const xp = require('../functions/lb');

module.exports.run = async (client, message) => {
	const lb = await xp.calculateLeaderboard(client, 10);

	const embed = new Discord.MessageEmbed()
		.addField('What are the points for? \n ', 'You get points for listening to songs in stage \n _ _')
		.addField('What to do with these points? \n', 'Get Nuggies premium!')
		.addField('Points:', `${lb}`)
		.setTitle('Global Points Leaderboard')
		.setTimestamp()
		.setColor('RANDOM');
	message.channel.send(embed);
};

module.exports.config = {
	name: 'leaderboard',
	description: 'Shows the leaderboard for 24/7 stage',
	usage: '!!lb',
	botPerms: [],
	userPerms: ['SEND_MESSAGES'],
	aliases: ['lb'],
};