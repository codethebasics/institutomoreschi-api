import { Patient, PrismaClient } from "@prisma/client";
import { PatientCreateRequest, PatientCreateResponse, PatientRemoveRequest, PatientRemoveResponse, PatientSelectResponse, PatientUpdateRequest, PatientUpdateResponse } from "../interfaces/dto/patient/PatientDTO";
import RoleService from "./RoleService";
import UserRoleService from "./UserRoleService";
import PatientRepository from "../repository/PatientRepository";


export default class PatientService {
    private prisma: PrismaClient
    private patientRepository: PatientRepository
    private roleService: RoleService
    private userRoleService: UserRoleService

    constructor () {    
        this.prisma = new PrismaClient()
        this.patientRepository = new PatientRepository()
        this.roleService = new RoleService()
        this.userRoleService = new UserRoleService()
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

    /**
     * ------
     * Delete
     * ------
     * @param patient 
     * @returns 
     */
    async remove(patient: PatientRemoveRequest): Promise<PatientRemoveResponse> {
        try {
            return await this.patientRepository.remove(patient)
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}