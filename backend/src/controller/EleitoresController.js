const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const eleitores = await connection('eleitores').select('*');
    
        return  response.json(eleitores);
    },

    async create(request, response) {
        const { name } = request.body;
    
        await connection('eleitores').insert({
            name,
        })
        return response.json();
    },

    async deletar(request, response) {
        const { name } = request.body;
        await connection('eleitores').where('name', name).delete();
        return response.status(204).send();
    }
}