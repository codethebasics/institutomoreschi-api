import { PrismaClient } from "@prisma/client";

/**
 * -----------------
 * Secretary service
 * -----------------
 * @author codethebasics
 */
export default class SecretaryService {
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
            return await this.prisma.secretary.findMany(filter)
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem das secretárias"
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
            return await this.prisma.secretary.findMany({
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
            throw "Erro durante a listagem das secretárias"
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param secretary
     */
    async create(secretary: any) {
        try {
            return await this.prisma.secretary.create(secretary)
        } catch (e) {
            console.error(e)
            throw "Erro durante a criação da secretária"
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param secretary 
     */
    async update(secretary: any) {
        try {
            return await this.prisma.secretary.update(secretary)
        } catch (e) {
            console.error(e)
            throw "Erro durante a atualização da secretária"
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param secretary 
     */
    async remove(secretary: any) {
        try {
            return await this.prisma.secretary.delete(secretary)
        } catch (e) {
            console.error(e)
            throw "Erro durante a remoção da secretária"
        }
    }
}