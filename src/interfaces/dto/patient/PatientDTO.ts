import { UserCreateResponse, UserSelectResponse } from '../user/UserDTO'

export interface PatientDTO {
    id?: string,
    birth_date?: Date,
    health_insurance_card_number?: string,
    user?: UserSelectResponse
}

export interface PatientSelectResponse extends PatientDTO {
    id: string,
    birth_date: Date
}

export interface PatientCreateRequest extends PatientDTO {
    birth_date: Date,
    userId: string
}

export interface PatientCreateResponse extends PatientDTO {
    id: string,
    birth_date: Date,
    user: UserSelectResponse
}

export interface PatientUpdateRequest extends PatientDTO {
    id: string
}

export interface PatientUpdateResponse extends PatientDTO {

}

export interface PatientRemoveRequest extends PatientDTO {
    id: string
}

export interface PatientRemoveResponse extends PatientDTO {
    
}