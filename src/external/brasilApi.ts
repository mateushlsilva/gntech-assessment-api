import axios from "axios";
import { CepData, MessageCepReturn } from "../types";

export async function getCepData(cep: string): Promise<MessageCepReturn> {
    try {
        const { data } = await axios.get<CepData>(`https://brasilapi.com.br/api/cep/v2/${cep}`)
        return {message: 'success!', error: false, data: data, source: null}
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unexpected error";
        return { error: true, message: errorMessage, data: null, source: null };
    } 
}
