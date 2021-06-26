const connection = require('../database/connection');

module.exports = {
	async index(_, response) {
		const eleitores = await connection('eleitores').select('*');

		return response.json(eleitores);
	},

	async create(request, response) {
		const { name, isElegivel } = request.body;

		await connection('eleitores').insert({
			name,
			isElegivel
		})
		return response.json();
	},

	async delete(request, response) {
		const { id } = request.params;
		try {
			await connection('eleitores').where('id', id).delete();
		} catch (e) {
			return response.json({
				success: false,
				error: e
			})
		}
		return response.json({
			success: true
		});
	}
}