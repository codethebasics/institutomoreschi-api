export interface ProcedureDTO {
    id?: string,
    name?: string,
    price?: number
}

export interface ProcedureCreateRequest extends ProcedureDTO {
    name: string,
    price: number
}

export interface ProcedureCreateResponse extends ProcedureDTO {
    id: string
}