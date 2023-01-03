import { PrismaClient } from "@prisma/client";

/**
 * ----------------
 * Dentists service
 * ----------------
 * @author codethebasics
 */
export default class DentistService {
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
            return await this.prisma.dentist.findMany(filter)
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem de dentistas"
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
            return await this.prisma.dentist.findMany({
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
            throw "Erro durante a listagem de dentistas"
        }
    }

    /**
     * -----------
     * Find by CRO
     * -----------
     * @param cro 
     */
    async findByCRO(cro: string) {
        try {
            return await this.prisma.dentist.findMany({
                where: {
                    cro: {
                        startsWith: cro
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem de dentistas"
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param dentist
     */
    async create(dentist: any) {
        try {
            return await this.prisma.dentist.create(dentist)
        } catch (e) {
            console.error(e)
            throw "Erro durante a criação do dentista"
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param dentist 
     */
    async update(dentist: any) {
        try {
            return await this.prisma.dentist.update(dentist)
        } catch (e) {
            console.error(e)
            throw "Erro durante a atualização do dentista"
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param dentist 
     */
    async remove(dentist: any) {
        try {
            return await this.prisma.dentist.delete(dentist)
        } catch (e) {
            console.error(e)
            throw "Erro durante a remoção do dentista"
        }
    }
}