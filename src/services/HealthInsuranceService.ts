import { HealthInsurance, PrismaClient } from "@prisma/client";
import { HealthInsuranceCreateRequest, HealthInsuranceCreateResponse, HealthInsuranceDTO } from "../interfaces/dto/health-insurance/HealthInsuranceDTO";

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
    async findAll(options: {
        includePatient: boolean
    }): Promise<HealthInsuranceCreateResponse[]> {
        try {
            const response = await this.prisma.healthInsurance.findMany({
                select: {
                    id: true,
                    name: true,
                    code: true,
                    PatientHealthInsurance: options.includePatient && {
                        select: {
                            patient: true
                        }
                    }
                }
            })
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
     * @param code 
     * @returns 
     */
    async findByCode(code: string): Promise<HealthInsuranceDTO> {
        try {
            if (!code) {
                throw "O código deve ser informado"
            }
            
            return await this.prisma.healthInsurance.findUniqueOrThrow({
                where: {
                    code: code
                },
                select: {
                    id: true,
                    name: true,
                    code: true
                }
            })
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