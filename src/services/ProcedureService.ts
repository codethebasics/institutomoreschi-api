import { PrismaClient } from "@prisma/client";

/**
 * -----------------
 * Procedure Service
 * -----------------
 * @author codethebasics
 */
export default class ProcedureService {
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
            return await this.prisma.procedure.findMany(filter)
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem dos procedimentos"
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
            return await this.prisma.procedure.findMany({
                where: {
                    name: {
                        startsWith: name
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem dos procedimentos"
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param procedure 
     */
     async create(procedure: any) {
        try {
            return await this.prisma.procedure.create(procedure)
        } catch (e) {
            console.error(e)
            throw "Erro durante o cadastro do procedimento"
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param procedure 
     */
     async update(procedure: any) {
        try {
            return await this.prisma.procedure.update(procedure)
        } catch (e) {
            console.error(e)
            throw "Erro durante a atualização do procedimento"
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param procedure 
     */
     async delete(procedure: any) {
        try {
            return await this.prisma.procedure.delete(procedure)
        } catch (e) {
            console.error(e)
            throw "Erro durante a remoção do procedimento"
        }
    }
}