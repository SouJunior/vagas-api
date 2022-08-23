import { Router } from "express";

import VagasController from "../controllers/vagas.js";

const routes = new Router();

routes.get("/vagas", VagasController.listar);
routes.get("/vagas/:id", VagasController.obter);
routes.post("/vagas", VagasController.cadastrar);
routes.put("/vagas/:id", VagasController.editar);
routes.delete("/vagas/:id", VagasController.excluir);

export default routes;
