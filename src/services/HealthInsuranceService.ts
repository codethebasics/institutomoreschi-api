import { PrismaClient } from "@prisma/client";

/**
 * ---------------
 * healthInsurance service
 * ---------------
 * @author codethebasics
 */
export default class HealthInsuranceService {
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
            const response = await this.prisma.healthInsurance.findMany()
            console.log(response)
            return response
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos convênios",
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
            return await this.prisma.healthInsurance.findMany({
                where: {                
                    name: {
                        startsWith: _name
                    }                    
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos convênios",
                data: _name,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param healthInsurance 
     * @returns 
     */
    async create(healthInsurance: any) {
        try {            
            return await this.prisma.healthInsurance.create({
                data: {
                    name: healthInsurance.name,
                    code: healthInsurance.code
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o convênio",
                data: healthInsurance,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param healthInsurance 
     * @returns 
     */
    async update(healthInsurance: any) {
        try {
            return await this.prisma.healthInsurance.update({
                data: healthInsurance,
                where: {
                    id: healthInsurance.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível atualizar o convênio",
                data: healthInsurance,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param healthInsurance 
     * @returns 
     */
    async remove(healthInsurance: any) {
        try {
            return await this.prisma.healthInsurance.delete({
                where: {
                    id: healthInsurance.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível remover o convênio",
                data: healthInsurance,
                error: e.message
            }
        }
    }
}