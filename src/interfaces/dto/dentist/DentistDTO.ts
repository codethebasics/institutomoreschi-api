import { UserSelectResponse } from "../user/UserDTO"

export interface DentistDTO {
    id?: string,
    cro?: string,
    user?: UserSelectResponse
}

export interface DentistCreateRequest extends DentistDTO {
    cro: string,
    userId: string
}

export interface DentistCreateResponse extends DentistDTO {
    user?: UserSelectResponse
}

export interface DentistUpdateRequest extends DentistDTO {
    cro: string
}

export interface DentistRemoveByIdRequest extends DentistDTO {
    id: string
}

export interface DentistRemoveByCRORequest extends DentistDTO {
    cro: string
}

export interface DentistRemoveResponse extends DentistDTO {
    id: string
}