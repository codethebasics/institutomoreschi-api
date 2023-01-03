import { PrismaClient } from "@prisma/client";

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
    async findByName(_name: string) {
        try {
            return await this.prisma.role.findMany({
                where: {
                    name: {
                        startsWith: _name
                    }
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos procedimentos",
                data: _name,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param role 
     * @returns 
     */
    async create(role: any) {
        try {
            return await this.prisma.role.create({
                data: {
                    name: role.name,
                    description: role.description
                }
            })
        } catch (e: any) {
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
    async update(role: any) {
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
    async remove(role: any) {
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