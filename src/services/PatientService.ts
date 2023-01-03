import { PrismaClient } from "@prisma/client";
import argon2 from 'argon2'

/**
 * ---------------
 * patient service
 * ---------------
 * @author codethebasics
 */
export default class PatientService {
    private prisma: PrismaClient;

    constructor () {    
        this.prisma = new PrismaClient()
    }

    /**
     * --------
     * Find all
     * --------
     * @param filter 
     * @returns 
     */
    async findAll(filter: {}) {
        try {
            const response = await this.prisma.patient.findMany()
            console.log(response)
            return response
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
     * @param _name 
     * @returns 
     */
    async findByName(_name: string) {
        try {
            return await this.prisma.patient.findMany({
                where: {
                    user: {
                        name: {
                            startsWith: _name
                        }
                    }
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos pacientes",
                data: _name,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param patient 
     * @returns 
     */
    async create(patient: any) {
        try {
            patient.user.password = argon2.hash(patient.user.password)
            return await this.prisma.patient.create({
                data: {
                    birth_date: patient.birth_date,
                    health_insurance_card_number: patient.health_insurance_card_number,
                    user: {
                        create: {
                            name: patient.user.name,
                            email: patient.user.email,
                            password: patient.user.password
                        }
                    }
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o paciente",
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
     * @returns 
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
                message: "Não foi possível atualizar o paciente",
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
     * @returns 
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
                message: "Não foi possível remover o paciente",
                data: patient,
                error: e.message
            }
        }
    }
}