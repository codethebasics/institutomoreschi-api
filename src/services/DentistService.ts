import { DentistCreateRequest, DentistCreateResponse, DentistRemoveByIdRequest, DentistRemoveResponse, DentistSelectResponse, DentistUpdateRequest, DentistUpdateResponse } from "../interfaces/dto/dentist/DentistDTO";
import DentistRepository from "../repository/DentistRepository";

export default class DentistService {
    private dentistRepository: DentistRepository

    constructor () {    
        this.dentistRepository = new DentistRepository()
    }

    async findAll() {
        try {
            return await this.dentistRepository.findAll()
        } catch (e: any) {
            console.error(e)
            throw e
        }        
    }

    async findByCRO(cro: string): Promise<DentistSelectResponse> {
        try {
            return await this.dentistRepository.findByCRO(cro)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async create(dentist: DentistCreateRequest): Promise<DentistCreateResponse> {        
        try {
            return await this.dentistRepository.save(dentist)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async update(dentist: DentistUpdateRequest): Promise<DentistUpdateResponse> {
        try {
            return await this.dentistRepository.update(dentist)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async remove(dentist: DentistRemoveByIdRequest): Promise<DentistRemoveResponse> {
        try {
            return await this.dentistRepository.remove(dentist)
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}