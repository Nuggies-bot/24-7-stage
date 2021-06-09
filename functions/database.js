const schema = require('../models/xp');

module.exports = {
	async getUser(id) {
		if (!id) throw Error('No ID provided');

		const data = await schema.findOne({ userID: id, guildID: '780334622164254720' });
		return data;
	},

	async createUser(id) {
		if (!id) throw Error('No ID provided');

		const data = await new schema({
			userID: id,
			guildID: '780334622164254720',
			xp: 0,
		}).save();

		return data;
	},

	async addXP(id, amount) {
		if (!id) throw Error('No ID provided');
		if (!amount || isNaN(amount)) throw Error('Only non 0 numbers should be provided');

		const data = await schema.findOne({ userID: id });

		if (!data) throw Error('User not found');

		data.xp += amount;
		data.save();

		return data;
	},

	async subtractXP(id, amount) {
		if (!id) throw Error('No ID provided');
		if (!amount || isNaN(amount)) throw Error('Only non 0 numbers should be provided');

		const data = await schema.findOne({ userID: id });

		if (!data) throw Error('User not found');

		data.xp -= amount;
		data.save();

		return data;
	},

	async getUsers(max) {
		if (!max) max = 1000;

		const users = await schema.find();
		users.sort((a, b) => a.xp - b.xp);
		if (users.length > max) {
			for (let i = 0; i < (users.length - max); i++) {
				users.pop();
			}
			return users;
		}
		return users;
	},

	async calculateLeaderboard(client, max = 5) {
		const users = await this.getUsers(max);

		await this.cacheUsers(users);

		if (!users[0]) throw Error('No users found');

		return users.map((x, i) => `\`${i}\` - ${client.users.cache.get(x.userID).tag} XP: ${x.xp}`).join('\n');
	},

	/**
	 * @private
	 */
	async cacheUsers(client, users) {
		users.map(x => x.id).forEach(async (id) => {
			await client.users.fetch(id, true);
		});
	},
};