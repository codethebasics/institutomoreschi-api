import { PrismaClient } from "@prisma/client";

/**
 * ------------------------
 * Health Insurance Service
 * ------------------------
 * @author codethebasics
 */
export default class HealthInsuranceService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }

    /**
     * --------
     * Find all
     * --------
     * @param filter 
     */
    async findAll(filter: {}) {
        try {
            return await this.prisma.healthInsurance.findMany(filter)
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem de convênios"
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
            return await this.prisma.healthInsurance.findMany({
                where: {
                    name: {
                        startsWith: name
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem de convênios"
        }
    }

    /**
     * ------------
     * Find by code
     * ------------
     * @param code 
     */
    async findByCode(code: string) {
        try {
            return await this.prisma.healthInsurance.findMany({
                where: {
                    code: {
                        startsWith: code
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem de convênios"
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param healthInsurance
     */
    async create(healthInsurance: any) {
        try {
            return await this.prisma.healthInsurance.create(healthInsurance)
        } catch (e) {
            console.error(e)
            throw "Erro durante a criação do convênio"
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param healthInsurance 
     */
    async update(healthInsurance: any) {
        try {
            return await this.prisma.healthInsurance.update(healthInsurance)
        } catch (e) {
            console.error(e)
            throw "Erro durante a atualização do convênio"
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param healthInsurance 
     */
    async remove(healthInsurance: any) {
        try {
            return await this.prisma.healthInsurance.delete(healthInsurance)
        } catch (e) {
            console.error(e)
            throw "Erro durante a remoção do convênio"
        }
    }
}