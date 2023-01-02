import { PrismaClient } from "@prisma/client";

/**
 * ------------------------
 * Health Insurance Service
 * ------------------------
 */
export default class HealthInsuranceService {
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
     * ------------
     * Find by code
     * ------------
     * @param code 
     */
    findByCode(code: string) {

    }

    /**
     * ------
     * Create
     * ------
     * @param healthInsurance
     */
    create(healthInsurance: {}) {

    }

    /**
     * ------
     * Update
     * ------
     * @param healthInsurance 
     */
    update(healthInsurance: {}) {

    }

    /**
     * ------
     * Delete
     * ------
     * @param healthInsurance 
     */
    delete(healthInsurance: {}) {

    }
}