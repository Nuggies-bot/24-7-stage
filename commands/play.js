const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
let interval = null;
module.exports.run = async (client, message, args) => {
	if(!message.member.roles.cache.has('851717791714115586')) return message.channel.send(new MessageEmbed().setTitle('Error').setDescription('You need the <@&851717791714115586> role to use this command.').setTimestamp().setColor('RANDOM'));
	const broadcast = client.voice.createBroadcast();
	const channel = message.member.voice.channel;
	if(channel.type !== 'stage') return message.channel.send('we only support stage channels.');
	if(!channel) return message.channel.send(new MessageEmbed().setTitle('epic bruh moment').setDescription('join a channel bruh I aint playing if no one listenin').setThumbnail('https://media1.tenor.com/images/cf7a595d6825e86da341dd1f2e8b2c18/tenor.gif?itemid=6151149').setTimestamp().setColor('RANDOM'));
	let stream = await ytdl(args[0]);
	stream.on('error', console.error);
	stream.on('end', () => {
		message.channel.send(new MessageEmbed().setTitle('ended!').setDescription('the stream has ended.').setTimestamp().setColor('RANDOM').setThumbnail(message.author.avatarURL({ dynamic: true })));
		message.guild.me.voice.channel.leave();
	});
	broadcast.play(stream);
	message.channel.send(new MessageEmbed().setTitle('Playing!').setDescription('Playing the stream, please make the bot a speaker').setTimestamp().setColor('RANDOM').setThumbnail(message.author.avatarURL({ dynamic: true })));
	if (!interval) {
		interval = setInterval(async function() {
			try {
				stream = await ytdl(args[0], { highWaterMark: 69, quality: 'highestaudio', type: 'opus' });
				stream.on('error', console.error);
				broadcast.play(stream, { highWaterMark: 69, volume: false });
			}
			catch (e) { return; }
		}, 1800000);
	}
	try {
		const connection = await message.member.voice.channel.join();
		message.guild.me.voice.setSuppressed(false);

		connection.play(broadcast);
	}
	catch (error) {
		console.error(error);
	}
	setInterval(async function() {
		if(!client.voice.connections.size) {
			if(!channel) return;
			try {
				const connection = await channel.join();
				connection.play(broadcast);
			}
			catch (error) {
				console.error(error);
			}
		}
	}, 20000);
};


module.exports.config = {
	name: 'play',
	description: 'play a stream',
	usage: '!!play <link>',
	botPerms: ['SPEAK', 'CONNECT', 'SEND_MESSAGES'],
	userPerms: ['ADMINISTRATOR'],
	aliases: ['playstream', 'streamplay'],
};
