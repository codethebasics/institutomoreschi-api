import { PrismaClient } from "@prisma/client";
import argon2 from 'argon2'

/**
 * ---------------
 * dentist service
 * ---------------
 * @author codethebasics
 */
export default class DentistService {
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
            const response = await this.prisma.dentist.findMany()
            return response
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos dentistas",
                error: e.message
            }
        }
        
    }

    /**
     * ------------
     * Find by name
     * ------------
     * @param cro 
     * @returns 
     */
    async findByCRO(cro: string) {
        try {
            return await this.prisma.dentist.findMany({
                where: {                
                    cro: {
                        contains: cro
                    }                    
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos dentistas",
                data: cro,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param dentist 
     * @returns 
     */
    async create(dentist: any) {
        try {            
            dentist.user.password = argon2.hash(dentist.user.password)
            return await this.prisma.dentist.create({
                data: {
                    cro: dentist.cro,
                    user: {
                        create: {
                            name: dentist.user.name,
                            email: dentist.user.email,
                            password: dentist.user.password
                        }
                    }
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o dentista",
                data: dentist,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param dentist 
     * @returns 
     */
    async update(dentist: any) {
        try {
            return await this.prisma.dentist.update({
                data: dentist,
                where: {
                    id: dentist.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível atualizar o dentista",
                data: dentist,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param dentist 
     * @returns 
     */
    async remove(dentist: any) {
        try {
            return await this.prisma.dentist.delete({
                where: {
                    id: dentist.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível remover o dentista",
                data: dentist,
                error: e.message
            }
        }
    }
}