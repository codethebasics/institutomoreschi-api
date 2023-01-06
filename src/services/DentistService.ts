import { Dentist, PrismaClient } from "@prisma/client";
import { DentistCreateRequest, DentistCreateResponse } from "../interfaces/dto/dentist/DentistDTO";

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
    async findByCRO(cro: string): Promise<Dentist | null> {
        try {
            return await this.prisma.dentist.findUnique({
                where: {
                    cro: cro
                }
            })
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param dentist 
     * @returns 
     */
     async create(dentist: DentistCreateRequest): Promise<DentistCreateResponse> {        
        try {
            return await this.prisma.dentist.create({
                data: {
                    cro: dentist.cro,
                    userId: dentist.userId
                },
                select: {
                    id: true,
                    cro: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            created_at: true,
                            updated_at: true,
                            active: true,
                        }
                    }
                }
            })
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param dentist 
     * @returns 
     */
    async update(dentist: Dentist) {
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
    async remove(dentist: Dentist) {
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