import { Response, Request } from "express";
import { CepService } from "../services";



class CepController {
    public async getCepController(req: Request, res: Response): Promise<Response> {
        try {
            const cep = req.params.cep
            const { data, error, source } = await CepService.getCepService(cep)
            if (error) {
                return res.status(404).json({message: "CEP não encontrado!"})
            }
            if (source === 'Internal') {
                return res.status(200).json({message: "success!", source ,data})
            }
            return res.status(201).json({message: "success!", source,data})
        }
        catch(err){
            return res.status(500).json({message: "Internal Server Error!"})
        }
    }

    public async getAllCepController(req:Request, res: Response): Promise<Response>{
        try{
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const { data } = await CepService.getAllCepService(page, limit)

            return res.status(200).json({data, page, limit})
        }
        catch(err){
            return res.status(500).json({message: "Internal Server Error!"})
        }
    }

    public async postCepController(req: Request, res: Response): Promise<Response>{
        try {
            const create = req.body
            const { data, message } = await CepService.postCepService(create)
            return res.status(201).json({data, message})
        }
        catch(err){
            return res.status(500).json({message: "Internal Server Error!"})
        }
    }
}

export default new CepController()