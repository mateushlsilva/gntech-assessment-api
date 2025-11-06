import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();


const AppDataSource = new DataSource({
    database: process.env.DB_NAME,
    type: "postgres", 
    host: process.env.DB_HOST, 
    port: Number(process.env.DB_PORT), 
    username: process.env.DB_USER, 
    password: process.env.DB_PASS, 
    synchronize: false,
    logging: false, 
    entities: ["src/entities/*.ts"], 
    migrations: ["src/migrations/*.ts"], 
    subscribers: [],
    maxQueryExecutionTime: 2000 // 2 seg.

});


AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source inicializado!") 
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e)
    });

export default AppDataSource;