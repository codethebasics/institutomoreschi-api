import { PrismaClient } from "@prisma/client";
import { PrismaClientExtensionError } from "@prisma/client/runtime";
import argon2 from 'argon2'

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
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos pacientes",
                error: e.message
            }
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
                            contains: name
                        }
                    }
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }, 
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos pacientes",
                data: name,
                error: e.message
            }
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
            return await this.prisma.patient.create({
                data: {
                    birth_date: patient.birth_date,
                    health_insurance_card_number: patient.health_insurance_card_number,
                    user: {
                        create: {
                            name: patient.user.name,
                            email: patient.user.email,
                            password: await argon2.hash(patient.user.password)
                        }
                    }
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante o cadastro do paciente",
                data: patient,
                error: e.message
            }
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
            return await this.prisma.patient.update({
                data: patient,
                where: {
                    id: patient.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a atualização do paciente",
                data: patient,
                error: e.message
            }
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
            return await this.prisma.patient.delete({
                where: {
                    id: patient.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a remoção do paciente",
                data: patient,
                error: e.message
            }
        }
    }
}