import { PrismaClient } from "@prisma/client";

/**
 * ------------
 * Role service
 * ------------
 * @author codethebasics
 */
export default class RoleService {
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
    findAll(filter: {}) {

    }

    /**
     * ------------
     * Find by name
     * ------------
     * @param name
     */
    findByName(name: string) {

    }

    /**
     * -------------------
     * Find by description
     * -------------------
     * @param description 
     */
    findByDescription(description: string) {

    }

    /**
     * ------
     * Create
     * ------
     * @param role 
     */
    create(role: {}) {

    }

    /**
     * ------
     * Update
     * ------
     * @param role 
     */
    update(role: {}) {

    }

    /**
     * ------
     * Delete
     * ------
     * @param role 
     */
    delete(role: {}) {

    }
}