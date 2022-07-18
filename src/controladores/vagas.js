const vagas = require('../bancoDeDados');

const filtrarVagas = (req,res) => {
   const {stack} = req.query;
   let resultado = vagas;

   if (stack) {
      resultado = vagas.filter((vaga) => {
         return vagas.stack === stack
      });
   }
   res.send(resultado);
}

module.exports = {
   filtrarVagas
}