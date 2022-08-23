import { Router } from "express";

import VagasController from "../controllers/vagas.js";

const routes = new Router();

routes.post("/", VagasController.cadastrar);
routes.get("/", VagasController.listar);
routes.get("/:id", VagasController.obterVaga);
routes.put("/:id", VagasController.editar);
routes.delete("/:id", VagasController.excluir);

export default routes;
