export interface HealthInsuranceDTO {
    id?: string,
    name?: string,
    code?: string
}

export interface HealthInsuranceCreateRequest extends HealthInsuranceDTO {
    name: string,
    code: string
}

export interface HealthInsuranceCreateResponse extends HealthInsuranceDTO {
    id: string
}