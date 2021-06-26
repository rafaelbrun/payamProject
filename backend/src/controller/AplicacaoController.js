const connection = require('../database/connection');

module.exports = {
  async resetar(request, response) {
    var candidatos = await connection('candidatos').select('*');
    var eleitores = await connection('eleitores').select('*');

    candidatos.forEach(async (candidato) => {
      await connection('candidatos')
        .where('id', candidato.id)
        .update({ votos: 0 });
    });

    eleitores.forEach(async (eleitor) => {
      await connection('eleitores')
        .where('id', eleitor.id)
        .update({ isElegivel: true });
    })

    return response.json();
  },
}