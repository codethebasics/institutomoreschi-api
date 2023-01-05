import { PrismaClient } from "@prisma/client";

export default class PacientHealthInsuranceService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    /**
     * ===============================
     * ADD HEALTH INSURANCE TO PATIENT
     * ===============================
     */
    async addHealthInsuranceToPatient(healthInsuranceId: string, patientId: string) {
        try {
            console.log('healthInsuranceId', healthInsuranceId)
            console.log('patientId', patientId)

            return await this.prisma.patientHealthInsurance.create({
                data: {
                    healthInsuranceId: healthInsuranceId,
                    patientId: patientId
                }
            })
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}