import { PrismaClient } from "@prisma/client";

/**
 * ------------
 * User service
 * ------------
 * @author codethebasics
 */
export default class UserService {
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
            const response = await this.prisma.user.findMany()
            console.log(response)
            return response
        } catch (e) {
            console.error(e)
            throw "Não foi possível realizar a consulta"
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
            return await this.prisma.user.findMany({
                where: {
                    name: {
                        startsWith: _name
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw "Não foi possível realizar a consulta"
        }
    }

    /**
     * -------------
     * Find by email
     * -------------
     * @param _email : email do user a ser pesquisado
     * @returns user
     */
    async findByEmail(_email: string) {
        try {
            return await this.prisma.user.findMany({
                where: {
                    email: {
                        startsWith: _email
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw "Não foi possível realizar a consulta"
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param user 
     * @returns 
     */
    async create(user: any) {
        try {
            return await this.prisma.user.create(user)
        } catch (e) {
            console.error(e)
            throw "Não foi possível criar o registro na base"
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param user 
     * @returns 
     */
    async update(user: any) {
        try {
            return await this.prisma.user.update({...user})
        } catch (e) {
            console.error(e)
            throw "Não foi possível atualizar o registro na base: "
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param user 
     * @returns 
     */
    async remove(user: any) {
        try {
            return await this.prisma.user.delete(user)
        } catch (e) {
            throw "Não foi possível remover o registro da base"
        }
    }
}