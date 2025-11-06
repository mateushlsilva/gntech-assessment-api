import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GNTech API",
      version: "1.0.0",
      description: "API para consulta e gerenciamento de CEPs, integrada com Redis e Postgres",
      contact: {
        name: "Mateus Silva",
        email: "mateushls01@gmail.com",
        url: "https://github.com/mateushlsilva",
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.ts")], 
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
