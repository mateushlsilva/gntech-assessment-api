import { Router } from "express";
import { CepController } from "../controllers";

const routes = Router()

/**
 * @swagger
 * /cep/find/{cep}:
 *   get:
 *     summary: Busca informações de um CEP
 *     description: Retorna dados de um CEP. Caso não exista, salva e retorna o resultado.
 *     parameters:
 *       - in: path
 *         name: cep
 *         required: true
 *         schema:
 *           type: string
 *           example: "12245000"
 *     responses:
 *       200:
 *         description: CEP encontrado no banco de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success!
 *                 source: 
 *                   type: string   
 *                   example: Internal
 *                 data:
 *                   type: object
 *                   example:
 *                      cep: "12245000"
 *                      state: "SP"
 *                      city: "São José dos Campos"
 *                      neighborhood: "Jardim São Dimas"
 *                      street: "Avenida Engenheiro Francisco José Longo"
 *                      service: "open-cep"
 *       201:
 *         description: CEP salvo e retornado após consulta externa
 *       404:
 *         description: CEP não encontrado
 *       500:
 *         description: Erro interno no servidor
 */


routes.get('/find/:cep', CepController.getCepController)


export default routes