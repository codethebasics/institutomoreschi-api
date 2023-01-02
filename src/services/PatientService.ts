import { PrismaClient } from "@prisma/client";

/**
 * ---------------
 * Patient Service
 * ---------------
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
    findAll(filter: {}) {

    }

    /**
     * ------------------------------------
     * Find by health insurance card number
     * ------------------------------------
     * @param healthInsuranceCardNumber 
     */
    findByHealthInsuranceCardNumber(healthInsuranceCardNumber: string) {

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
     * @param patient 
     */
    create(patient: {}) {

    }

    /**
     * ------
     * Update
     * ------
     * @param patient 
     */
    update(patient: {}) {

    }

    /**
     * ------
     * Delete
     * ------
     * @param patient 
     */
    delete(patient: {}) {

    }
}