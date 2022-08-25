const conexao = require('../conexao');

const ListAll = async (req, res) => {
   try {
      const{ rows: vagas } = await conexao.pool.query('select * from "Vagas"');
      return res.status(200).json(vagas);
   } catch(error) {
      return res.status(400).json(error.message);
   }
}

const ListOne = async (req, res) => {
   const{ id } = req.params;
   try {
      const { rows: vagas } = await conexao.pool.query('select * from "Vagas" where id = $1', [id]);

      if (vagas.length === 0) {
         return res.status(404).json('Vaga não encontrada');
      }

      return res.status(200).json(vagas[0]);
   } catch(error) {
      return res.status(400).json(error.message);
   }
}

const Register = async (req, res) => {   
   
   const {title, description, type} = req.body;

   try {
      conexao.pool.query('insert into "Vagas" (title, description, type) values ($1, $2, $3)', [title, description, type], (error) => {
          if (error) {
            console.log("Error", error)
             console.log(error) 
          }
       });
       return res.status(200).json('Vaga cadastrada com sucesso');
    } catch(error) {
       return res.status(400).json(error.message);
    }
 }
//  const Update = async (req, res) => {
//    const { id } = req.params;
//    const { title, description, type } = req.body;
//    try {
//       const{ rows : vagas } = await conexao.pool.query('select * from "Vagas" where id = $1', [id]);

//       if (vagas.rowCount === 0) {
//          return res.status(404).json('Vaga não encontrada');
//       }
//       const vagaAtualizada = await conexao.pool.query('update "Vagas" set title = $1, description = $2, type = $3 where id = $4', [title, description, type, id ]);

//       if (vagaAtualizada.rowCount === 0) {
//          return res.status(404).json('Vaga não atualizada');
//       }
//       return res.status(200).json('Vaga Atualizada com sucesso');
//    } catch(error) {
//       return res.status(400).json(error.message);
//    }
// }

const Delete = async (req, res )=> {
   const { id } = req.params;

   try {
      const { rows: vagas } = await conexao.pool.query('select * from "Vagas" where id = $1', [id]);

      if (vagas.length === 0) {
         return res.status(404).json('Vaga não encontrada');
      }

      const vagaExcluida = await conexao.pool.query('delete from "Vagas" where id = $1', [ id ]);

      if (vagaExcluida.rowCount === 0) {
         return res.status(404).json('Não foi possível excluir vaga');
      }

      return res.status(200).json('Vaga Excluída');
   } catch(error) {
      return res.status(400).json(error.message);
   }

}    

module.exports = {    
   ListAll,
   ListOne,
   Register,
   //Update,
   Delete  
}