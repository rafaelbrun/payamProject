const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const candidatos = await connection('candidatos').select('*');
    
        return  response.json(candidatos);
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
        const { name } = request.body;
    
        const candidato = await connection('candidatos')
        .where('name', name)
        .select('votos')
        .first();
    
        candidato.votos++;
    
        await connection('candidatos')
        .where('name', name)
        .update({votos: candidato.votos})
    
        return response.json(candidato);
    },

    async deletar(request, response) {
        const { name } = request.body;
        await connection('candidatos').where('name', name).delete();
        return response.status(204).send();
    }
}