const express = require('express');
const vagas = require('./controladores/vagas');

const rotas = express();

rotas.get('/', (req,res) => {
   return res.send('servidor funcionando');
});

rotas.get('/vagas', vagas.listarVagas);
rotas.get('/vagas/:id', vagas.obterVaga);
rotas.post('/vagas', vagas.cadastrarVaga);
rotas.put('/vagas/:id', vagas.editarVaga); 

module.exports = rotas;