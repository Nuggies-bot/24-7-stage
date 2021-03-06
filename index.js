require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ intents: Discord.Intents.ALL });
const fs = require('fs');
const mongoose = require('mongoose');
const queue = require('./models/queue');
client.login(process.env.TOKEN);
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
	autoIndex: false });
const Queue = require('./structures/queue');
client.queue = new Queue();

const xp = require('./functions/lb');
client.on('ready', async () => {
	console.log('Online!');
	let data = await queue.findOne({ guildID: '780334622164254720' });
	if(!data) {
		data = new queue({
			guildID: '780334622164254720',
			songs: [],
		});
		await data.save();
	}
	client.user.setActivity('to polo G', { type: 'LISTENING' });

	// XP System
	setInterval(async () => {
		const channel = await client.channels.fetch('827108248150736916', true, true);

		const members = channel.members.filter(x => !x.voice.selfDeaf && !x.user.bot);

		members.map(x => xp.addXP(x.id, Math.floor(Math.random() * 3) + 1));
	}, Math.floor(Math.random() * 10) + 10 * 1000);
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) console.log(err);
	const file = files.filter(f => f.split('.').pop() === 'js');
	if (file.length < 1) {
		console.log('No Commands.');
		return;
	}
	file.forEach(f => {
		const pull = require(`./commands/${f}`);
		client.commands.set(pull.config.name, pull);
		pull.config.aliases.forEach(aliases => client.aliases.set(aliases, pull.config.name));
	});
});

client.on('message', async message => {
	const prefix = '!!';
	if (message.author.bot || message.channel.type === 'dm') return;
	if (message.content.startsWith(prefix)) {
		const messageArray = message.content.split(' ');
		const cmd = messageArray[0];
		const args = messageArray.slice(1);
		const command = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
		if (command) {
			if (!command.config.botPerms) return console.log('You didn\'t provide botPerms');
			if (!Array.isArray(command.config.botPerms)) return console.log('botPerms must be an array.');
			if (!command.config.userPerms) return console.log('You didn\'t provide userPerms.');
			if (!Array.isArray(command.config.userPerms)) return console.log('userPerms must be an array.');

			command.run(client, message, args);
		}
	}
});
