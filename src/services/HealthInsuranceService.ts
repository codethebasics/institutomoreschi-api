import { HealthInsurance, PrismaClient } from "@prisma/client";
import { HealthInsuranceCreateRequest } from "../interfaces/dto/health-insurance/HealthInsuranceDTO";

/**
 * -----------------------
 * HealthInsurance service
 * -----------------------
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
     * @param code 
     * @returns 
     */
    async findByCode(code: string): Promise<HealthInsurance | null> {
        try {
            const response = await this.prisma.healthInsurance.findUnique({
                where: {
                    code: code
                }
            })
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
     * @param healthInsurance 
     * @returns 
     */
    async create(healthInsurance: HealthInsuranceCreateRequest) {
        try {            
            return await this.prisma.healthInsurance.create({
                data: {
                    name: healthInsurance.name,
                    code: healthInsurance.code
                }
            })
        } catch (e: any) {
            console.log(e)
            throw e
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param healthInsurance 
     * @returns 
     */
    async update(healthInsurance: HealthInsurance) {
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
    async remove(healthInsurance: HealthInsurance) {
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