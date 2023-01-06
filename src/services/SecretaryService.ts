import { PrismaClient, Secretary } from "@prisma/client";
import { SecretaryCreateRequest } from "../interfaces/dto/secretary/SecretaryDTO";

/**
 * -----------------
 * Secretary service
 * -----------------
 * @author codethebasics
 */
export default class SecretaryService {
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
            return await this.prisma.secretary.findMany({
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                }
            })
        } catch (e) {
            console.error(e)
            throw "Erro durante a listagem das secretárias"
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
            return await this.prisma.secretary.findMany({
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
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o usuário",
                data: name,
                error: e.message
            }
        }
    }

    /**
     * ------------
     * Find by name
     * ------------
     * @param email 
     */
     async findByEmail(email: string) {
        try {
            return await this.prisma.secretary.findMany({
                where: {
                    user: {
                        email: email
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
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o usuário",
                data: name,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param secretary
     */
    async create(secretary: SecretaryCreateRequest) {        
        try {
            return await this.prisma.secretary.create({
                data: {                    
                    userId: secretary.userId
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar a secretaria",
                data: secretary,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param secretary 
     */
    async update(secretary: Secretary) {
        try {
            return await this.prisma.secretary.update({
                data: {
                    
                },
                where: {
                    id: secretary.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível atualizar a secretaria",
                data: secretary,
                error: e.message
            }
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param secretary 
     */
    async remove(secretary: Secretary) {
        try {
            return await this.prisma.secretary.delete({
                where: {
                    id: secretary.id
                }
            })
        } catch (e) {
            console.error(e)
            throw "Erro durante a remoção da secretária"
        }
    }
}