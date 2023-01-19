import { PrismaClient } from "@prisma/client";

/**
 * -----------------------
 * Medical history service
 * -----------------------
 * @author codethebasics
 */
export default class MedicalHistoryService {
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
    async findAll() {
        try {
            const response = await this.prisma.medicalHistory.findMany({
                select: {
                    id: true,
                    description: true,
                    created_at: true,
                    updated_at: true,
                    patient: {
                        select: {
                            id: true,
                            birth_date: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    created_at: true,
                                    updated_at: true,
                                    active: true
                                }
                            }
                        }
                    },
                    dentist: {
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
                                    active: true
                                }
                            }
                        }
                    }
                },                
            })
            return response
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }

    /**
     * ------
     * Create
     * ------
     * @param procedure 
     * @returns 
     */
    async create(medicalHistory: {
        patientId: string,
        dentistId: string,
        description: string,
    }): Promise<any> {
        try {
            return await this.prisma.medicalHistory.create({
                data: {
                    patientId: medicalHistory.patientId,
                    dentistId: medicalHistory.dentistId,
                    description: medicalHistory.description,
                },
                select: {
                    id: true,
                    patientId: true,
                    dentistId: true,
                    description: true
                }
            })
        } catch (e: any) {
            console.error(e)
            throw e
        }
    }
    
}