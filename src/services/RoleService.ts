import { PrismaClient } from "@prisma/client";

/**
 * ------------
 * Role service
 * ------------
 * @author codethebasics
 */
export default class RoleService {
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
            return await this.prisma.role.findMany(filter)            
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem das permissões"
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
            return await this.prisma.role.findMany({
                where: {
                    name: {
                        startsWith: name
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem das permissões"
        }
    }

    /**
     * -------------------
     * Find by description
     * -------------------
     * @param description 
     */
    async findByDescription(description: string) {
        try {
            return await this.prisma.role.findMany({
                where: {
                    description: {
                        startsWith: description
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem das permissões"
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param role 
     */
    async create(role: any) {
        try {
            return await this.prisma.role.create(role)
        } catch (e) {
            console.error(e)
            throw "Erro durante a criação da permissão"
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param role 
     */
    async update(role: any) {
        try {
            return await this.prisma.role.update(role)
        } catch (e) {
            console.error(e)
            throw "Erro durante a atualização da permissão"
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param role 
     */
    async remove(role: any) {
        try {
            return await this.prisma.role.delete(role)
        } catch (e) {
            console.error(e)
            throw "Erro durante a remoção da permissão"
        }
    }
}