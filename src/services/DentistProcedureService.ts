import { DentistProcedure, PrismaClient } from "@prisma/client";

export default class DentistProcedureService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async addProcedureToDentistAndPatient(
        procedureId: string, 
        dentistId: string, 
        patientId: string): Promise<DentistProcedure | null>
    {
        try {
            return await this.prisma.dentistProcedure.create({
                data: {
                    procedureId: procedureId,
                    dentistId: dentistId,
                    patientId: patientId,
                    scheduled_for: new Date('2023-01-07'),
                }
            })        
        } catch (e) {
            console.log('patientId', patientId)
            console.error(e)
            throw e
        }
    }
}