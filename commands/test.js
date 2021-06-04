module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js');
    const DisTube = require('distube');
    const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
    /**
     * JSDOC
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} args
     * @returns
     */      
    message.member.voice.channel.join();
    distube.play(message, args.join());
}

module.exports.config = {
    name: 'test',
    description: 'Test Command',
    usage: '?test',
    botPerms: [],
    userPerms: ['ADMINISTRATOR'],
    aliases: ['test-command', 'gamer-test']
}