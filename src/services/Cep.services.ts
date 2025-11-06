import { AppDataSource, redis } from "../config"
import { CepEntities } from "../entities/cep.entities"
import { getCepData } from "../external";
import { CepData, MessageCepReturn } from "../types";

class CepService {
    public async getCepService(cep: string): Promise<MessageCepReturn>{
        try{
            // Vai buscar no redis primeiro 
            const cacheKey = `cep:${cep}`
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log("Cache hit");
                return {data: JSON.parse(cached), error: false, message: "success!", source: 'Internal'};
            }
            // Vai buscar no banco de dados
            const repository = AppDataSource.getRepository(CepEntities)
            const findCep = await repository.findOneBy({cep: cep})

            if (findCep) {
                await redis.set(cacheKey, JSON.stringify(findCep), "EX", 3600);
                console.log("Cache miss (DB)");
                return {error: false, message: "success!", data: findCep, source: 'Internal' };
            }

           // Vai buscar na API Externa
            const { data, error, message, source } = await getCepData(cep)
            if (error === true || !data) {
                return {error, message, data, source}
            }
            
            const newCep = repository.create({
                cep: data.cep,
                city: data.city,
                neighborhood: data.neighborhood,
                service: data.service,
                state: data.state,
                street: data.street,
            });
            const saveCep = await repository.save(newCep)
            await redis.set(cacheKey, JSON.stringify(saveCep), "EX", 3600);
            console.log("Cache miss (API)");
            return {error: false, message: "success!", data: saveCep, source: 'external'}
        }
        catch (err: unknown){
            const errorMessage = err instanceof Error ? err.message : "Unexpected error";
            return { error: true, message: errorMessage, data: null, source: null };
        }
    }

    public async getAllCepService(page = 1, limit = 10): Promise<MessageCepReturn>{
        try{
            const start = (page - 1) * limit;
            const end = start + limit - 1;

            const paginated = await redis.zrange("ceps", start, end);
            if (paginated.length === limit) {
                const result = paginated.map(item => JSON.parse(item));
                return { error: false, message: "success!", data: result as any, source: "cache" };
            }

            // Se não tiver dados suficientes no cache, busca do banco
            const repository = AppDataSource.getRepository(CepEntities);
            const [ceps, total] = await repository.findAndCount({
                skip: start,
                take: limit
            });

            // Adiciona os registros buscados ao ZSET
            for (const cep of ceps) {
                await redis.zadd("ceps", cep.id, JSON.stringify(cep));
            }
            await redis.expire("ceps", 259200);
            return { error: false, message: "success!", data: ceps as any, source: "DB" };
                
        }
        catch (err: unknown){
            const errorMessage = err instanceof Error ? err.message : "Unexpected error";
            return { error: true, message: errorMessage, data: null, source: null };
        }
    }

    public async postCepService(data: CepData): Promise<MessageCepReturn>{
        try {
            const cacheKey = `cep:${data.cep}`
            const repository = AppDataSource.getRepository(CepEntities)
            const newCep = repository.create({
                cep: data.cep,
                city: data.city,
                neighborhood: data.neighborhood,
                service: data.service,
                state: data.state,
                street: data.street,
            });
            const saveCep = await repository.save(newCep)
            await redis.set(cacheKey, JSON.stringify(saveCep), "EX", 3600);
            console.log("Cache miss (API)");
            return {error: false, message: "success!", data: saveCep, source: 'Internal'}
        }
        catch (err: unknown){
            const errorMessage = err instanceof Error ? err.message : "Unexpected error";
            return { error: true, message: errorMessage, data: null, source: null };
        }
    }

    public async putCepService(){

    }

    public async deleteCepService(){

    }
}

export default new CepService()