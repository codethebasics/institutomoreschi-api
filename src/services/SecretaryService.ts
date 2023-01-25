import { SecretaryCreateRequest, SecretaryCreateResponse, SecretaryRemoveRequest, SecretaryRemoveResponse, SecretarySelectResponse, SecretaryUpdateRequest, SecretaryUpdateResponse } from "../interfaces/dto/secretary/SecretaryDTO";
import SecretaryRepository from "../repository/SecretaryRepository";

export default class SecretaryService {
    private secretaryRepository: SecretaryRepository

    constructor() {
        this.secretaryRepository = new SecretaryRepository()
    }

    async findAll(): Promise<SecretarySelectResponse[]> {
        try {
            return await this.secretaryRepository.findAll()
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem das secretárias"
        }
    }

    async findByName(name: string): Promise<SecretarySelectResponse[]> {
        try {
            return await this.secretaryRepository.findByName(name)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async findByEmail(name: string): Promise<SecretarySelectResponse | null> {
        try {
            return await this.secretaryRepository.findByEmail(name)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async create(secretary: SecretaryCreateRequest): Promise<SecretaryCreateResponse> {        
        try {
            return await this.secretaryRepository.save(secretary)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async update(secretary: SecretaryUpdateRequest): Promise<SecretaryUpdateResponse> {
        try {
            return await this.secretaryRepository.update(secretary)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async remove(secretary: SecretaryRemoveRequest): Promise<SecretaryRemoveResponse> {
        try {
            return await this.secretaryRepository.remove(secretary)
        } catch (e) {
            console.error(e)
            throw "Erro durante a remoção da secretária"
        }
    }
}