const { vagas } = require('../bancodedados');

let {identificadorVaga} = require('../bancodedados');

const listarVagas = (req, res) => {
   return res.status(200).json(vagas);
}

const obterVaga = (req, res) => {
   const {id} = req.params;

   const vaga = vagas.find((vaga) => {
      return vaga.id === Number(id);
   });

   if (!vaga) {
      return res.status(404).json({mensagem:'vaga não encontrada.'});      
   }
   return res.status(200).json(vaga)
}

const cadastrarVaga = (req, res) => {
   const { titulo_da_vaga, descricao, tipo_de_vaga } = req.body;
   if (!titulo_da_vaga) {
      return res.status(400).json({mensagem: "É obrigatório o preenchimento do campo titulo_da_vaga"});      
   }
   if (!descricao) {
      return res.status(400).json({mensagem: "É obrigatório o preenchimento do campo descricao"});      
   }
   if (!tipo_de_vaga) {
      return res.status(400).json({mensagem: "É obrigatório o preenchimento do campo tipo_de_vaga"});      
   }
   
   const vaga = {
      id: identificadorVaga++,
      titulo_da_vaga,
      descricao,
      tipo_de_vaga,     
   }

   vagas.push(vaga);

   return res.status(201).json(vaga);
}

const editarVaga = (req, res) => {
   const {id} = req.params;
   const {titulo_da_vaga, descricao, tipo_de_vaga} = req.body;
   if (!titulo_da_vaga) {
      return res.status(400).json({mensagem: "É obrigatório o preenchimento do campo titulo_da_vaga"});      
   }
   if (!descricao) {
      return res.status(400).json({mensagem: "É obrigatório o preenchimento do campo descricao"});      
   }
   if (!tipo_de_vaga) {
      return res.status(400).json({mensagem: "É obrigatório o preenchimento do campo tipo_de_vaga"});      
   }
   const vaga = vagas.find((vaga) => {
      return vaga.id === Number(id);
   });

   if (!vaga) {
      return res.status(404).json({mensagem:'vaga não encontrada.'});      
   }

   vaga.titulo_da_vaga = titulo_da_vaga;
   vagas.descricao = descricao;
   vaga.tipo_de_vaga = tipo_de_vaga;
   
   return res.status(204).json({mensagem: 'vaga editada com sucesso'});
}

module.exports = {
   listarVagas,
   obterVaga,
   cadastrarVaga,
   editarVaga   
}