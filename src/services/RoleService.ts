import { PrismaClient, Role } from "@prisma/client";
import { RoleCreateRequest, RoleCreateResponse } from "../interfaces/dto/role/RoleDTO";

/**
 * ------------
 * role service
 * ------------
 * @author codethebasics
 */
export default class RoleService {
    private prisma: PrismaClient;

    constructor () {    
        this.prisma = new PrismaClient()
    }

    /**
     * --------
     * Find all
     * --------
     * @param filter 
     * @returns 
     */
    async findAll(filter: {}) {
        try {
            const response = await this.prisma.role.findMany()
            return response
        } catch (e: any) {
            console.error(e)
            throw e
        }
        
    }

    /**
     * ------------
     * Find by name
     * ------------
     * @param _name 
     * @returns 
     */
    async findByName(_name: string): Promise<Role> {
        try {
            const response = await this.prisma.role.findUnique({
                where: {
                    name: _name
                }
            })
            if (!response) {
                throw "Não foi possível encontrar a permissão"
            }
            return response
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }    

    /**
     * ------
     * Create
     * ------
     * @param role 
     * @returns 
     */
    async create(role: RoleCreateRequest): Promise<RoleCreateResponse> {
        try {
            return await this.prisma.role.create({
                data: {
                    name: role.name,
                    description: role.description
                }
            })            
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param role 
     * @returns 
     */
    async update(role: Role) {
        try {
            return await this.prisma.role.update({
                data: role,
                where: {
                    id: role.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível atualizar o procedimento",
                data: role,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param role 
     * @returns 
     */
    async remove(role: Role) {
        try {
            return await this.prisma.role.delete({
                where: {
                    id: role.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível remover o procedimento",
                data: role,
                error: e.message
            }
        }
    }
}