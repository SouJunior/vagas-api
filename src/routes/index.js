import { Router } from "express";
import vagasRoutes from "./vagas.js";

const routes = new Router();

routes.use("/vagas", vagasRoutes);

export default routes;
