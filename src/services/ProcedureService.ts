import { PrismaClient, Procedure } from "@prisma/client";
import { ProcedureCreateRequest } from "../interfaces/request/procedure/ProcedureCreateRequest";
import { ProcedureCreateResponse } from "../interfaces/response/procedure/ProcedureCreateResponse";

/**
 * -----------------
 * procedure service
 * -----------------
 * @author codethebasics
 */
export default class ProcedureService {
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
            const response = await this.prisma.procedure.findMany()
            console.log(response)
            return response
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos procedimentos",
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
            return await this.prisma.procedure.findMany({
                where: {
                    name: {
                        startsWith: _name
                    }
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Erro durante a listagem dos procedimentos",
                data: _name,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param procedure 
     * @returns 
     */
    async create(procedure: ProcedureCreateRequest): Promise<ProcedureCreateResponse> {
        try {
            return await this.prisma.procedure.create({
                data: {
                    name: procedure.name,
                    price: procedure.price
                }
            })
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    /**
     * -----------
     * Create many
     * -----------
     * @param procedure 
     * @returns 
     */
     async createMany(procedures: ProcedureCreateRequest[]) {
        try {
            const response = await this.prisma.procedure.createMany({
                data: procedures
            })
            return response
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param procedure 
     * @returns 
     */
    async update(procedure: Procedure) {
        try {
            return await this.prisma.procedure.update({
                data: procedure,
                where: {
                    id: procedure.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível atualizar o procedimento",
                data: procedure,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param procedure 
     * @returns 
     */
    async remove(procedure: Procedure) {
        try {
            return await this.prisma.procedure.delete({
                where: {
                    id: procedure.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível remover o procedimento",
                data: procedure,
                error: e.message
            }
        }
    }
}