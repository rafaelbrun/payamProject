import { ICandidato, IResponse, IResponseListar } from "../interfaces/IResponse";
import api from "./api";

export function listar(): Promise<IResponseListar<ICandidato>> {
    return Promise.resolve(api.get('candidatos'));
}

export function registrar(name: string): Promise<null> {
    return Promise.resolve(api.post('candidatos', { name, votos: 0 }))
}

export function votar(id: number, eleitor: string): Promise<IResponse<ICandidato>> {
    return Promise.resolve(api.put(`votar/${id}`, { eleitor }, { timeout: 8000 }));
}

export function deletar(id: number): Promise<IResponse<ICandidato>> {
    return Promise.resolve(api.delete(`candidatos/${id}`, { timeout: 8000 }));
}