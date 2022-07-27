const express = require('express');
const vagas = require('./controladores/vagas');

const rotas = express();

rotas.get('/', (req,res) => {
   return res.send('servidor funcionando');
});

rotas.get('/vagas', vagas.listar);
rotas.get('/vagas/:id', vagas.obter);
rotas.post('/vagas', vagas.cadastrar);
rotas.put('/vagas/:id', vagas.editar);
rotas.delete('/vagas/:id', vagas.excluir); 

module.exports = rotas;