import { PrismaClient, Role } from "@prisma/client";

import { GenericResponse } from "../interfaces/response/GenericResponse";
import { RoleCreateRequest } from "../interfaces/request/role/RoleCreateRequest";

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
            console.log(response)
            return response
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos procedimentos",
                error: e.message
            }
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
    async create(role: RoleCreateRequest): Promise<GenericResponse | undefined> {
        try {
            const response = await this.prisma.role.create({
                data: {
                    name: role.name,
                    description: role.description
                }
            })
            return {
                status: 200,
                message: 'Permissão criada com sucesso', 
                data: response
            }
        } catch (e: any) {
            console.error(e)
            return {
                status: 500,
                message: "Não foi possível criar o procedimento",
                data: role,
                error: e.message
            }
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