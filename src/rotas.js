const express = require('express');
const vagas = require('./controladores/vagas');

const rotas = express();

rotas.get('/', (req,res) => {
   return res.send('servidor funcionando');
});

rotas.get('/vagas', vagas.ListAll);
rotas.get('/vagas/:id', vagas.ListOne);
rotas.post('/vagas', vagas.register);
//rotas.put('/vagas/:id', vagas.editar);
rotas.delete('/vagas/:id', vagas.Delete); 

module.exports = rotas;