import argon2 from 'argon2';

import { Prisma, PrismaClient } from "@prisma/client";
import {
    UserCreateRequest,
    UserCreateResponse, UserRemoveRequest,
    UserRemoveResponse, UserSelectResponse, UserUpdateRequest,
    UserUpdateResponse
} from "../interfaces/dto/user/UserDTO";
import { ExceptionMessage } from "../interfaces/message/ExceptionMessage";

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
    async findAll(): Promise<UserSelectResponse[] | ExceptionMessage> {
        try {
            const data = await this.prisma.user.findMany({        
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true,
                    updated_at: true,
                    active: true,
                    user_role: {
                        select: {
                            role: {
                                select: {
                                    name: true,
                                    description: true
                                }
                            }
                        }
                    }
                }
            })

            if (!data.length) {
                return {
                    message: 'Nenhum usuário encontrado'
                }
            }

            return data
        } catch (e: any) {
            return {
                message: "Erro durante a listagem de usuários",
                cause: e.message
            }
        }
        
    }

    /**
     * ----------
     * Find by id
     * ----------
     * @param userId 
     * @returns 
     */
     async findById(userId: string) {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true,
                    updated_at: true,
                    active: true,
                    user_role: true
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
                        contains: _name
                    }
                },
                select: {
                    name: true,
                    email: true,
                    created_at: true,
                    updated_at: true,
                    active: true,
                    user_role: {
                        select: {
                            role: {
                                select: {
                                    name: true,
                                    description: true
                                }
                            }
                        }
                    }
                }
            })
        } catch (e: any) {
            console.error(e)
            return {
                message: 'Erro ao buscar usuário pelo nome',
                cause: e
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
    async findByEmail(_email: string): Promise<UserSelectResponse> {
        try {
            return await this.prisma.user.findUniqueOrThrow({
                where: {
                    email: _email
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true,
                    updated_at: true,
                    active: true,
                    user_role: true
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
     * @param user 
     * @returns 
     */
    async create(user: UserCreateRequest): Promise<UserCreateResponse> {
        try {
            return await this.prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: await argon2.hash(user.password),
                    active: user.active
                }
            })            
        } catch (e: any) {
            throw e
        }
    }

    /**
     * ------
     * Update
     * ------
     * @param user 
     * @returns 
     */
    async update(user: UserUpdateRequest): Promise<UserUpdateResponse | ExceptionMessage> {
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
            return {
                message: 'Não foi possível atualizar o usuário',
                cause: e
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
    async remove(user: UserRemoveRequest): Promise<UserRemoveResponse | ExceptionMessage> {
        try {
            return await this.prisma.user.delete({
                where: {
                    id: user.id
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })
        } catch (e: any) {
            console.log(e)
            return {
                message: 'Erro ao remover usuário',
                cause: e
            }
        }
    }
}