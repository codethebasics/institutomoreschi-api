import { PrismaClient } from "@prisma/client"

export default class DentistService {
    private prisma: PrismaClient
    
    constructor(_prisma: PrismaClient) {
        this.prisma = _prisma
    }

    findAll(filter: {}) {

    }

    findByCRO(cro: string) {

    }

    create(dentist: {}) {

    }

    update(dentist: {}) {
        
    }

    delete(dentist: {}) {
        
    }
}