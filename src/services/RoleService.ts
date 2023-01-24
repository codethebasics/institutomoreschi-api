import { RoleCreateRequest, RoleCreateResponse, RoleRemoveRequest, RoleRemoveResponse, RoleSelectResponse, RoleUpdateRequest, RoleUpdateResponse } from "../interfaces/dto/role/RoleDTO";
import RoleRepository from "../repository/RoleRepository";

export default class RoleService {
    private roleRepository: RoleRepository

    constructor () {    
        this.roleRepository = new RoleRepository()
    }

    async findAll(): Promise<RoleSelectResponse[]> {
        try {
            return await this.roleRepository.findAll()
        } catch (e: any) {
            console.error(e)
            throw e
        }
        
    }

    async findByName(name: string): Promise<RoleSelectResponse> {
        try {
            return await this.roleRepository.findByName(name)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }    

    async create(role: RoleCreateRequest): Promise<RoleCreateResponse> {
        try {
            return await this.roleRepository.save(role)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async update(role: RoleUpdateRequest): Promise<RoleUpdateResponse> {
        try {
            return await this.roleRepository.update(role)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    async remove(role: RoleRemoveRequest): Promise<RoleRemoveResponse> {
        try {
            return await this.roleRepository.remove(role)
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }
}