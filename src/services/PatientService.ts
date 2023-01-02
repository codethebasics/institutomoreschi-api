import { PrismaClient } from "@prisma/client";

/**
 * ---------------
 * Patient Service
 * ---------------
 * @author codethebasics
 */
export default class PatientService {
    private prisma: PrismaClient

    constructor(_prisma: PrismaClient) {
        this.prisma = _prisma
    }

    /**
     * --------
     * Find all
     * --------
     * @param filter 
     */
    async findAll(filter: {}) {
        try {
            return await this.prisma.patient.findMany(filter)
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem dos pacientes"
        }
    }

    /**
     * ------------------------------------
     * Find by health insurance card number
     * ------------------------------------
     * @param healthInsuranceCardNumber 
     */
    async findByHealthInsuranceCardNumber(healthInsuranceCardNumber: string) {
        try {
            return await this.prisma.patient.findMany({
                where: {
                    health_insurance_card_number: {
                        startsWith: healthInsuranceCardNumber
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem dos pacientes"
        }
    }

    /**
     * ------------
     * Find by name
     * ------------
     * @param name 
     */
    async findByName(name: string) {
        try {
            return await this.prisma.patient.findMany({
                where: {
                    user: {
                        name: {
                            startsWith: name
                        }
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem dos pacientes"
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param patient 
     */
    async create(patient: any) {
        try {
            return await this.prisma.patient.create(patient)
        } catch (e) {
            console.error(e)
            throw "Erro durante a criação do paciente"
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param patient 
     */
    async update(patient: any) {
        try {
            return await this.prisma.patient.update(patient)
        } catch (e) {
            console.error(e)
            throw "Erro durante a atualização do paciente"
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param patient 
     */
    async delete(patient: any) {
        try {
            return await this.prisma.patient.delete(patient)
        } catch (e) {
            console.error(e)
            throw "Erro durante a remoção do paciente"
        }
    }
}