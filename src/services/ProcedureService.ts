import { ProcedureCreateRequest, ProcedureCreateResponse, ProcedureRemoveRequest, ProcedureRemoveResponse, ProcedureSelectResponse, ProcedureUpdateRequest, ProcedureUpdateResponse } from "../interfaces/dto/procedure/ProcedureDTO";
import ProcedureRepository from "../repository/ProcedureRepository";

export default class ProcedureService {
    private procedureRepository: ProcedureRepository

    constructor () {    
        this.procedureRepository = new ProcedureRepository()
    }

    async findAll(): Promise<ProcedureSelectResponse[]> {
        try {
            return await this.procedureRepository.findAll()
        } catch (e: any) {
            console.error(e)
            throw e
        }
        
    }

    async findByName(name: string): Promise<ProcedureSelectResponse> {
        try {
            return await this.procedureRepository.findByName(name)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async create(procedure: ProcedureCreateRequest): Promise<ProcedureCreateResponse> {
        try {
            return await this.procedureRepository.save(procedure)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async update(procedure: ProcedureUpdateRequest): Promise<ProcedureUpdateResponse> {
        try {
            return this.procedureRepository.update(procedure)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async remove(procedure: ProcedureRemoveRequest): Promise<ProcedureRemoveResponse> {
        try {
            return await this.procedureRepository.remove(procedure)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }
}