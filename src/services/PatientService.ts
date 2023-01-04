import { Patient, PrismaClient, User } from "@prisma/client";
import argon2 from 'argon2'
import RoleService from "./RoleService";
import UserRoleService from "./UserRoleService";

/**
 * ---------------
 * patient service
 * ---------------
 * @author codethebasics
 */
export default class PatientService {
    private prisma: PrismaClient;
    private roleService: RoleService;
    private userRoleService: UserRoleService;

    constructor () {    
        this.prisma = new PrismaClient();
        this.roleService = new RoleService();
        this.userRoleService = new UserRoleService();
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
    async create(patient: Patient): Promise<Patient | undefined> {
        try {                        
            const patientCreated = await this.prisma.patient.create({
                data: {
                    birth_date: patient.birth_date,
                    health_insurance_card_number: patient.health_insurance_card_number,          
                    user: {
                        connect: {
                            id: patient.userId
                        }
                    }          
                }
            })

            return patientCreated;

        } catch (e: any) {
            console.error(e);      
        }
        
        return undefined
    }

    /**
     * ------
     * Update
     * ------
     * @param patient 
     * @returns 
     */
    async update(patient: Patient) {
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
    async remove(patient: Patient) {
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