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


/**
 * @swagger
 * /cep/all:
 *   get:
 *     summary: Retorna todos os CEPs com paginação
 *     description: Busca todos os CEPs armazenados, usando cache Redis se disponível. Permite paginar os resultados.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página dos resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de itens por página
 *     responses:
 *       200:
 *         description: Lista de CEPs retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       cep:
 *                         type: string
 *                         example: "12236610"
 *                       state:
 *                         type: string
 *                         example: "SP"
 *                       city:
 *                         type: string
 *                         example: "São José dos Campos"
 *                       neighborhood:
 *                         type: string
 *                         example: "Cidade Morumbi"
 *                       street:
 *                         type: string
 *                         example: "Rua Maximino José de Almeida"
 *                       service:
 *                         type: string
 *                         example: "open-cep"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unexpected error"
 *                 error:
 *                   type: boolean
 *                   example: true
 */

routes.get('/all', CepController.getAllCepController)

export default routes