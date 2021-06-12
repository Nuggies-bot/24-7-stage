const { VoiceConnection } = require('discord.js');
const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js');

class Queue {
	constructor(data) {
		if (data) return this._setup(data);

		this.songs = [];

	}

	setConnection(connection) {
		if (!connection) throw new Error('Give a valid connection');
		this.connection = connection;
	}

	play(message) {
		if (!this.connection) throw new Error('No connection found!');
		const stream = ytdl(this.queue[0]);
		this.connection.play(stream);
		stream.on('error', console.error);
		stream.on('end', () => {
			this._skipSong();
			if (!this.queue[0]) {
				message.guild.me.voice.channel.leave();
				return message.channel.send(new MessageEmbed().setTitle('ended!').setDescription('the stream has ended.').setTimestamp().setColor('RANDOM').setThumbnail(message.author.avatarURL({ dynamic: true })));;
			}
			message.channel.send(`Playing ${this.queue[0]} now!`);
			this.play(message);
		});
	}

	addSong(song) {
		console.log(this.songs.length);
		this.songs.push(song);
	}

	get queue() {
		return this.songs;
	}

	_setup(data) {
		this.connection = data.connection;
		this.songs = [];
	}

	_skipSong() {
		return this.songs.shift();
	}
}

module.exports = Queue;