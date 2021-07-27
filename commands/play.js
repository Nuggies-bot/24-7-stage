const {
	MessageEmbed
} = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const ytpl = require('ytpl');
const Schema = require('../models/queue.js');
module.exports.run = async (client, message, args) => {
	
	if(!message.member.roles.cache.has('851717791714115586')) return message.channel.send(new MessageEmbed().setTitle('Error').setDescription('You need the <@&851717791714115586> role to use this command.').setTimestamp().setColor('RANDOM'));
	
	const channel = message.member.voice.channel;
	if (!channel) return message.channel.send(new MessageEmbed().setTitle('epic bruh moment').setDescription('join a channel bruh I aint playing if no one listenin').setThumbnail('https://media1.tenor.com/images/cf7a595d6825e86da341dd1f2e8b2c18/tenor.gif?itemid=6151149').setTimestamp().setColor('RANDOM'));
	 if (channel.type !== 'stage') return message.channel.send('we only support stage channels.');

	if (!args[0]) return message.channel.send(new MessageEmbed().setTitle('Error').setDescription('You need to tell me somethin play bruh').setTimestamp().setColor('RANDOM'));
	let link = args[0]
	const isPlaylist = await validatePlaylist(link)
	const data = await Schema.findOne({ guildID: message.guild.id })
	if(data) {
		await data.delete()
	}
	if (isPlaylist === true) {
		let regPlaylist = /[?&]list=([^#&?]+)/;
		playlist = link.match(regPlaylist);
		const pl = await ytpl(playlist[1])
		const songsInPL = pl.items
		const songUrl = songsInPL.map((song) => song.url)
		if (!client.queue.queue[0]) {
			const connection = await channel.join();
			client.queue.setConnection(connection);
			songUrl.forEach((song) => {
				client.queue.addSong(song)
			})
			client.queue.play(message);
			return message.channel.send(new MessageEmbed().setTitle('Playing!').setDescription('Playing the playlist, please make the bot a speaker').setTimestamp().setColor('RANDOM').setThumbnail(message.author.avatarURL({
				dynamic: true
			})))
		}
	}

	const isValid = ytdl.validateURL(args[0]);
	if (!isValid) return message.channel.send(new MessageEmbed().setTitle('Error').setDescription('You need to provide a proper youtube link.').setTimestamp().setColor('RANDOM'));



	if (!client.queue.queue[0]) {
		const connection = await channel.join();
		client.queue.setConnection(connection);
		client.queue.addSong(args[0]);
		client.queue.play(message);
		message.channel.send(new MessageEmbed().setTitle('Playing!').setDescription('Playing the stream, please make the bot a speaker').setTimestamp().setColor('RANDOM').setThumbnail(message.author.avatarURL({
			dynamic: true
		})));
	} else {
		message.channel.send('Added to queue!');
	}

	/*
	if (!interval) {
		interval = setInterval(async function() {
			try {
				stream = await ytdl(args[0], { highWaterMark: 1 << 25, quality: 'highestaudio', type: 'opus', filter: 'audio' });
				stream.on('error', console.error);
				broadcast.play(stream, { volume: false, highWaterMark: 1 << 25 });
			}
			catch (e) { return; }
		}, 1800000);
	}
	*/

	try {
		const connection = await message.member.voice.channel.join();
		message.guild.me.voice.setSuppressed(false);

		client.queue.setConnection(connection);

		client.queue.addSong(args[0]);
		if (!client.queue.queue[0]) {
			client.queue.play(message);
		}
	} catch (error) {
		console.error(error);
	}

	setInterval(async () => {
		if (!client.voice.connections.size) {
			if (!channel) return;
			try {
				const connection = await channel.join();
				client.queue.setConnection(connection);
				client.queue.play(message);
				message.guild.me.voice.setSuppressed(false);
			} catch (error) {
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

function validatePlaylist(url) {
	if (url) {
		var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
		return true;
	} else {
		return false
	}
}
