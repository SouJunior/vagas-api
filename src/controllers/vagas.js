import conexao from '../configs/conexao.js'

class VagasController {
  async listar() {
    try {
      const { rows: vagas } = await conexao.query("select * from vagas");
      return res.status(200).json(vagas);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async obterVaga() {
    const { id } = req.params;
    try {
      const { rows: vagas } = await conexao.query(
        "select * from vagas where id = $1",
        [id]
      );

      if (vagas.rowCount === 0) {
        return res.status(404).json("Vaga não encontrada");
      }

      return res.status(200).json(vagas.rows[0]);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async cadastrar() {
    const { titulo_vaga, descricao, tipo } = req.body;

    if (!titulo_vaga || !descricao || !tipo) {
      return res.status(400).json("Favor preencher campos obrigatórios");
    }

    try {
      const query =
        "insert into vagas (titulo, descricao, tipo) values ($1, $2, $3)";
      const vaga = await conexao.query(query, [titulo_vaga, descricao, tipo]);

      if (vaga.rowCount === 0) {
        return res.status(400).json("não foi possível cadastrar vaga");
      }

      return res.status(200).json("Vaga cadastrada com sucesso.");
    } catch (error) {
      return res.status(400).json("mensagem de erro");
    }
  }

  async editar() {
    const { id } = req.params;
    const { titulo_vaga, descricao, tipo } = req.body;
    try {
      const { rows: vagas } = await conexao.query(
        "select * from vagas where id = $1",
        [id]
      );

      if (vagas.rowCount === 0) {
        return res.status(404).json("Vaga não encontrada");
      }

      if (!titulo_vaga || !descricao || !tipo) {
        return res.status(400).json("Favor preencher campos obrigatórios");
      }

      const vagaAtualizada = await conexao.query(
        "update vagas set titulo_vaga = $1, descricao = $2, tipo = $3 where id = $4",
        [titulo_vaga, descricao, tipo, id]
      );

      if (vagaAtualizada.rowCount === 0) {
        return res.status(404).json("Vaga não atualizada");
      }

      if (!titulo_vaga || !descricao || !tipo) {
        return res.status(400).json("Favor preencher campos obrigatórios");
      }
      return res.status(200).json("Vaga Atualizada com sucesso");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async excluir() {
    const { id } = req.params;

    try {
      const { rows: vagas } = await conexao.query(
        "select * from vagas where id = $1",
        [id]
      );

      if (vagas.rowCount === 0) {
        return res.status(404).json("Vaga não encontrada");
      }

      const vagaExcluida = await conexao.query(
        "delete from vagas where id = $1",
        [id]
      );

      if (vagaExcluida.rowCount === 0) {
        return res.status(404).json("Não foi possível exclui vaga");
      }

      return res.status(200).json("Vaga Excluída");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default new VagasController();
