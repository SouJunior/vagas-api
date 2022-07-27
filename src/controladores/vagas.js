let { vagas, identificadorVaga } = require('../bancodedados');

const listar = (req, res) => {
   return res.status(200).json(vagas);
}

const obter = (req, res) => {
   const {id} = req.params;

   const vaga = vagas.find((vaga) => {
      return vaga.id === Number(id);
   });

   if (!vaga) {
      return res.status(404).json({mensagem:'vaga não encontrada.'});      
   }
   return res.status(200).json(vaga)
}

const cadastrar = (req, res) => {
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

const editar = (req, res) => {
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

const excluir = (req, res) => {
   const { id } = req.params;

   const vaga = vagas.find((vaga) => {
      return vaga.id === Number(id);
   });

   if (!vaga) {
      return res.status(404).json({mensagem: 'Vaga não existe.'});
   }

   vagas = vagas.filter((vaga) => {
      return vaga.id !== Number(id);
   });

   return res.status(204).send();   
}

module.exports = {
   listar,
   obter,
   cadastrar,
   editar,
   excluir   
}