import { IEleitor, IResponse, IResponseListar } from "../interfaces/IResponse";
import api from "./api";

export function listar(): Promise<IResponseListar<IEleitor>> {
    return Promise.resolve(api.get('eleitores'));
}

export function registrar(name: string): Promise<null> {
    return Promise.resolve(api.post('eleitores', { name, votos: 0 }))
}

export function deletar(id: number): Promise<IResponse<IEleitor>> {
    return Promise.resolve(api.delete(`eleitores/${id}`, { timeout: 8000 }));
}