export interface HealthInsuranceDTO {
    id?: string,
    name?: string,
    code?: string
}

export interface HealthInsuranceSelectResponse extends HealthInsuranceDTO {

}

export interface HealthInsuranceCreateRequest extends HealthInsuranceDTO {
    name: string,
    code: string
}

export interface HealthInsuranceCreateResponse extends HealthInsuranceDTO {

}

export interface HealthInsuranceUpdateRequest extends HealthInsuranceDTO {
    id: string
}

export interface HealthInsuranceUpdateResponse extends HealthInsuranceDTO {

}

export interface HealthInsuranceRemoveRequest extends HealthInsuranceDTO {
    id: string
}

export interface HealthInsuranceRemoveResponse extends HealthInsuranceDTO {
    
}

