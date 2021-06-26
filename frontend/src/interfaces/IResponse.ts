export interface IResponseListar<T> {
  data: T[];
}

export interface IResponse<T> {
  data: {
    success: boolean,
    candidato?: T
  }
}

export interface ICandidato {
  id?: number,
  name: string,
  votos: number
}

export interface IEleitor {
  id?: number,
  name: string,
  isElegivel: boolean
}