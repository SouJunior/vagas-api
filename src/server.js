import express from "express";
const app = express();
import cors from "cors";
import routes from "./routes/index.js";

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
