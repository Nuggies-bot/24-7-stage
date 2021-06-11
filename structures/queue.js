const { VoiceConnection } = require('discord.js');

class Queue {
	constructor(data) {
		if (data) return this._setup(data);

		this.songs = [];

	}

	setConnection(connection) {
		if (!connection) throw new Error('Give a valid connection');
		this.connection = connection;
	}

	play() {
		if (!this.connection) throw new Error('No connection found!');
		this.connection.play(this.queue[0]);
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