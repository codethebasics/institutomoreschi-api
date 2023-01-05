import { PrismaClient, User } from "@prisma/client";

import argon2 from 'argon2'
import { isNull } from "util";
import { UserCreateRequest } from "../interfaces/request/user/UserCreateRequest";
import { UserUpdateRequest } from "../interfaces/request/user/UserUpdateRequest";
import { UserCreatedResponse } from "../interfaces/response/user/UserCreatedResponse";
import { UserUpdatedResponse } from "../interfaces/response/user/UserUpdatedResponse";

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
                message: "Erro durante a listagem de usuários",
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
     async findById(userId: string): Promise<User | null> {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
        } catch (e: any) {
            console.error(e)
            return null
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
                message: "Erro durante a listagem de usuários",
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
    async findByEmail(_email: string): Promise<User | null> {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    email: _email
                }
            })
        } catch (e: any) {
            console.error(e)
            return null
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param user 
     * @returns 
     */
    async create(user: UserCreateRequest): Promise<UserCreatedResponse | undefined> {
        try {
            const response = await this.prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: await argon2.hash(user.password),
                    active: user.active
                }
            })
            return {
                id: response.id,
                name: response.name,
                email: response.email,
                created_at: response.created_at,
                active: response.active
            }
        } catch (e: any) {
            console.error(e)
            return undefined
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param user 
     * @returns 
     */
    async update(user: UserUpdateRequest): Promise<UserUpdatedResponse | undefined> {
        try {
            if (user.password) {
                user.password = await argon2.hash(user.password)
            }
            return await this.prisma.user.update({
                data: user,
                where: {
                    id: user.id
                }
            })
        } catch (e: any) {
            console.error(e)
            return undefined
        }
    }

    /**
     * ------
     * Delete
     * ------
     * @param user 
     * @returns 
     */
    async remove(user: User) {
        try {
            return await this.prisma.user.delete({
                where: {
                    id: user.id
                }
            })
        } catch (e: any) {
            return {
                status: 500,
                message: "Não foi possível remover o usuário",
                data: user,
                error: e.message
            }
        }
    }
}