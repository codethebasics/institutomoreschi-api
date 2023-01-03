import { PrismaClient } from "@prisma/client";

import argon2 from 'argon2'

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
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o usuário",
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
            return await this.prisma.user.findMany({
                where: {
                    name: {
                        startsWith: _name
                    }
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o usuário",
                data: _name,
                error: e.message
            }
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
                        contains: _email
                    }
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o usuário",
                data: _email,
                error: e.message
            }
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
            return await this.prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: await argon2.hash(user.password)
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o usuário",
                data: user,
                error: e.message
            }
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
            user.password = await argon2.hash(user.password)
            return await this.prisma.user.update({
                data: user,
                where: {
                    id: user.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o usuário",
                data: user,
                error: e.message
            }
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
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível criar o usuário",
                data: user,
                error: e.message
            }
        }
    }
}