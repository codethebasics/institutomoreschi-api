import PatientRepository from "../repository/PatientRepository";

import { 
    PatientCreateRequest, 
    PatientCreateResponse, 
    PatientRemoveRequest, 
    PatientRemoveResponse, 
    PatientSelectResponse, 
    PatientUpdateRequest, 
    PatientUpdateResponse 
} from "../interfaces/dto/patient/PatientDTO";


export default class PatientService {
    private patientRepository: PatientRepository
    
    constructor () {    
        this.patientRepository = new PatientRepository()
    }

    async findAll(): Promise<PatientSelectResponse[]> {
        try {
            return await this.patientRepository.findAll()            
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async findByName(name: string): Promise<PatientSelectResponse[]> {
        try {
            return await this.patientRepository.findByName(name)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async findByEmail(email: string): Promise<PatientSelectResponse> {
        try {
            return await this.patientRepository.findByEmail(email)
        } catch(e) {
            console.error(e)
            throw e
        }
    }

    async create(patient: PatientCreateRequest): Promise<PatientCreateResponse> {
        try {                        
            return await this.patientRepository.save(patient)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async update(patient: PatientUpdateRequest): Promise<PatientUpdateResponse> {
        try {
            return await this.patientRepository.update(patient)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async remove(patient: PatientRemoveRequest): Promise<PatientRemoveResponse> {
        try {
            return await this.patientRepository.remove(patient)
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}