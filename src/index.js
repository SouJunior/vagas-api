const express = require ('express');

const {filtrarVagas} = require('./controladores/vagas');

const app = express();

app.get('/', (req,res) => {
   res.send('Página inicial');
});

app.get('/vagas', filtrarVagas);

app.listen(3000);

