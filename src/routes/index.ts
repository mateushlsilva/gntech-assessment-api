import cors = require("cors");
import { Router, Request, Response } from "express";

import cep from "./cep.route"

const routes = Router()

routes.use(cors());

routes.use("/cep", cep)


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;