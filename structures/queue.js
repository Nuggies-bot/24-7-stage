const {
	VoiceConnection,
} = require('discord.js');
const ytdl = require('ytdl-core');
const {
	MessageEmbed,
} = require('discord.js');
const Schema = require('../models/queue');
const { rawListeners } = require('../models/queue');
class Queue {
	constructor(data) {
		if (data) return this._setup(data);

	}

	setConnection(connection) {
		if (!connection) throw new Error('Give a valid connection');
		this.connection = connection;
	}

	async play(message) {
		if (!this.connection) throw new Error('No connection found!');
		const queue = await Schema.findOne({ guildID: message.guild.id });
		const stream = ytdl(queue.songs[Math.floor(Math.random() * queue.songs.length)], { highWaterMark: 1 << 25, quality: 'highestaudio', type: 'opus', filter: 'audioonly' });
		this.connection.play(stream);
		stream.on('error', console.error);
		stream.on('end', () => {
			if (!queue.songs[0]) {
				message.guild.me.voice.channel.leave();
				return message.channel.send(new MessageEmbed().setTitle('ended!').setDescription('the stream has ended.').setTimestamp().setColor('RANDOM').setThumbnail(message.author.avatarURL({
					dynamic: true,
				})));
			}
			message.channel.send(`Playing ${queue.songs[0]} now!`);
			this.play(message);
		});
	}

	async addSong(message, song) {
		await Schema.findOneAndUpdate({
			guildID: message.guild.id,
		}, {
			$push: {
				songs: song,
			},
		}, {
			upsert: true,
		});
	}

	async getQueue(message) {
		const queue = Schema.findOne({
			guildID: message.guild.id,
		});
		if (!queue) {
			throw new Error(`No queue is present for ${message.guild.name} (${message.guild.id})`);
		}
		else {
			return queue.songs;
		}
	}

	_setup(data) {
		this.connection = data.connection;
	}
}

module.exports = Queue;
