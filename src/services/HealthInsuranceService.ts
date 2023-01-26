import { HealthInsuranceCreateRequest, HealthInsuranceCreateResponse, HealthInsuranceSelectResponse, HealthInsuranceUpdateRequest, HealthInsuranceUpdateResponse, HealthInsuranceRemoveRequest, HealthInsuranceRemoveResponse } from "../interfaces/dto/health-insurance/HealthInsuranceDTO";
import HealthInsuranceRepository from "../repository/HealthInsuranceRepository";

export default class HealthInsuranceService {
    private healthInsuranceRepository: HealthInsuranceRepository

    constructor () {    
        this.healthInsuranceRepository = new HealthInsuranceRepository()
    }

    async findAll(): Promise<HealthInsuranceCreateResponse[]> {
        try {
            return await this.healthInsuranceRepository.findAll()
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async findByCode(code: string): Promise<HealthInsuranceSelectResponse> {
        try {
            if (!code) {
                throw "O código deve ser informado"
            }            
            return await this.healthInsuranceRepository.findByCode(code)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async create(healthInsurance: HealthInsuranceCreateRequest): Promise<HealthInsuranceCreateResponse> {
        try {            
            return await this.healthInsuranceRepository.save(healthInsurance)
        } catch (e: any) {
            console.log(e)
            throw e
        }
    }

    async update(healthInsurance: HealthInsuranceUpdateRequest): Promise<HealthInsuranceUpdateResponse> {
        try {
            return await this.healthInsuranceRepository.update(healthInsurance)
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async remove(healthInsurance: HealthInsuranceRemoveRequest): Promise<HealthInsuranceRemoveResponse> {
        try {
            if (!healthInsurance || !healthInsurance.id) {
                throw "O id do convênio deve ser informado"
            }
            return await this.healthInsuranceRepository.remove(healthInsurance)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }
}