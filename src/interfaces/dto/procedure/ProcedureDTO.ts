export interface ProcedureDTO {
    id?: string,
    name?: string,
    price?: number
}

export interface ProcedureSelectResponse extends ProcedureDTO {
    id: string,
    name: string,
    price: number
}

export interface ProcedureCreateRequest extends ProcedureDTO {
    name: string,
    price: number
}

export interface ProcedureCreateResponse extends ProcedureDTO {
    id: string
}

export interface ProcedureUpdateRequest extends ProcedureDTO {
    id: string
}

export interface ProcedureUpdateResponse extends ProcedureDTO {

}

export interface ProcedureRemoveRequest extends ProcedureDTO {
    id: string
}

export interface ProcedureRemoveResponse extends ProcedureDTO {
    
}