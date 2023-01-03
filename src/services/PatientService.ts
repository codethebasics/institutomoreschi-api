import { PrismaClient } from "@prisma/client";

/**
 * ---------------
 * Patient service
 * ---------------
 * @author codethebasics
 */
export default class PatientService {
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
            return await this.prisma.patient.findMany(filter)
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
    async remove(patient: any) {
        try {
            return await this.prisma.patient.delete(patient)
        } catch (e) {
            console.error(e)
            throw "Erro durante a remoção do paciente"
        }
    }
}