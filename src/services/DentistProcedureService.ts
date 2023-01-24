import { DentistProcedureCreateRequest, DentistProcedureCreateResponse, DentistProcedureRemoveRequest, DentistProcedureRemoveResponse, DentistProcedureSelectResponse, DentistProcedureUpdateRequest, DentistProcedureUpdateResponse } from "../interfaces/dto/dentist-procedure/DentistProcedureDTO";
import DentistProcedureRepository from "../repository/DenstistProcedureRepository";

export default class DentistProcedureService {
    private dentistProcedureRepository: DentistProcedureRepository

    constructor() {
        this.dentistProcedureRepository = new DentistProcedureRepository()
    }

    async listProcedureToDentistAndPatient(): Promise<DentistProcedureSelectResponse[]> {
        try {
            return await this.dentistProcedureRepository.findAll()
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async findProcedureToDentistAndPatientById(
        procedureId: string,
        dentistId: string,
        patientId: string
    ): Promise<DentistProcedureSelectResponse> {
        try {
            let valid = dentistId
                && patientId
                && procedureId

            if (!valid) {
                throw "Todos os parâmetros devem ser informados"
            }

            return await this.dentistProcedureRepository.findById(procedureId, dentistId, patientId)
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async addProcedureToDentistAndPatient(dentistProcedure: DentistProcedureCreateRequest): Promise<DentistProcedureCreateResponse> {
        try {
            let valid = dentistProcedure.dentistId
                && dentistProcedure.patientId
                && dentistProcedure.procedureId

            if (!valid) {
                throw "Todos os parâmetros devem ser informados"
            }

            return await this.dentistProcedureRepository.save(dentistProcedure)            
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async removeProcedureFromDentistAndPatient(dentistProcedure: DentistProcedureRemoveRequest): Promise<DentistProcedureRemoveResponse> {
        try {   
            let valid = dentistProcedure.dentistId
                && dentistProcedure.patientId
                && dentistProcedure.procedureId

            if (!valid) {
                throw "Todos os parâmetros devem ser informados"
            } 
            return await this.dentistProcedureRepository.remove(dentistProcedure)            
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async updateProcedureFromDentistAndPatient(dentistProcedure: DentistProcedureUpdateRequest): Promise<DentistProcedureUpdateResponse> {
        try {
            let valid = dentistProcedure.dentistId
                && dentistProcedure.patientId
                && dentistProcedure.procedureId

            if (!valid) {
                throw "Todos os parâmetros devem ser informados"
            } 
            return await this.dentistProcedureRepository.update(dentistProcedure)
        } catch(e) {
            console.error(e)
            throw e
        }     
    }
}