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
     * ------
     * Create
     * ------
     * @param procedure 
     */
    create(procedure: {}) {

    }

    /**
     * ------
     * Update
     * ------
     * @param procedure 
     */
    update(procedure: {}) {
        
    }

    /**
     * ------
     * Delete
     * ------
     * @param procedure 
     */
    delete(procedure: {}) {
        
    }
}