const connection = require('../database/connection');

module.exports = {
	async index(request, response) {
		const candidatos = await connection('candidatos').select('*');

		return response.json(candidatos);
	},

	async create(request, response) {
		const { name, votos } = request.body;

		await connection('candidatos').insert({
			name,
			votos,
		})
		return response.json();
	},

	async votar(request, response) {
		const { id } = request.params;
		const { eleitor } = request.body;

		try {
			const eleitorResp = await connection('eleitores')
				.where('name', eleitor)
				.first();

			eleitorResp.isElegivel = false;

			const candidato = await connection('candidatos')
				.where('id', id)
				.first();

			candidato.votos++;

			await connection('candidatos')
				.where('id', id)
				.update({ votos: candidato.votos });

			await connection('eleitores')
				.where('id', eleitorResp.id)
				.update({ isElegivel: eleitorResp.isElegivel });

			return response.json({
				success: true,
				candidato
			});
		} catch (e) {
			console.log(e);
			return response.json({
				success: false,
				error: 'Candidato não encontrado.'
			});
		}
	},

	async delete(request, response) {
		const { id } = request.params;
		try {
			await connection('candidatos').where('id', id).delete();
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