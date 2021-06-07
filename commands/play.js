const ytdl = require('ytdl-core');
let interval = null;

module.exports.run = async (client, message, args) => {
	const broadcast = client.voice.createBroadcast();
	const channel = message.member.voice.channel;
	if(!channel) return message.channel.send('please join a channel');
	let stream = await ytdl(args[0]);
	stream.on('error', console.error);
	stream.on('end', () => {
		console.log('it ended');
	});
	broadcast.play(stream);
	message.channel.send('playing!');
	if (!interval) {
		interval = setInterval(async function() {
			try {
				stream = await ytdl(args[0], { highWaterMark: 100 << 150 });
				stream.on('error', console.error);
				broadcast.play(stream);
			}
			catch (e) { return; }
		}, 1800000);
	}
	try {
		const connection = await message.member.voice.channel.join();
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