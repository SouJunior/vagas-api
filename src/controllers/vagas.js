import conection from "../configs/conexao.js";

class VagasController {
  async listar(req, res) {
    try {
      const { rows: vagas } = await conection("select * from vagas");
      return res.status(200).json(vagas);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async obterVaga(req, res) {
    const { id } = req.params;
    try {
      const { rows: vagas } = await conection(
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

  async cadastrar(req, res) {
    const { titulo_vaga, descricao, tipo } = req.body;

    if (!titulo_vaga || !descricao || !tipo) {
      return res.status(400).json("Favor preencher campos obrigatórios");
    }

    try {
      const query =
        "insert into Vagas (Vagas.title, Vagas.description,Vagas.usuario_id) values ($1, $2, $3)";
      const vaga = await conection(query, [titulo_vaga, descricao, tipo]);

      if (vaga.rowCount === 0) {
        return res.status(400).json("não foi possível cadastrar vaga");
      }

      return res.status(200).json("Vaga cadastrada com sucesso.");
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Erro ao cadastrar uma nova vaga", error:error });
    }
  }

  async editar(req, res) {
    const { id } = req.params;
    const { titulo_vaga, descricao, tipo } = req.body;
    try {
      const { rows: vagas } = await conection(
        "select * from vagas where id = $1",
        [id]
      );

      if (vagas.rowCount === 0) {
        return res.status(404).json("Vaga não encontrada");
      }

      if (!titulo_vaga || !descricao || !tipo) {
        return res.status(400).json("Favor preencher campos obrigatórios");
      }

      const vagaAtualizada = await conection(
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

  async excluir(req, res) {
    const { id } = req.params;

    try {
      const { rows: vagas } = await conection(
        "select * from vagas where id = $1",
        [id]
      );

      if (vagas.rowCount === 0) {
        return res.status(404).json("Vaga não encontrada");
      }

      const vagaExcluida = await conection(
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
