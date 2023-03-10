import { PrismaClient } from "@prisma/client"
import {
  PatientCreateRequest,
  PatientCreateResponse,
  PatientRemoveRequest,
  PatientRemoveResponse,
  PatientSelectResponse,
  PatientUpdateRequest,
  PatientUpdateResponse,
} from "../interfaces/dto/patient/PatientDTO"

export default class PatientRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async count(): Promise<number> {
    return await this.prisma.patient.count()
  }

  async findById(userId: string): Promise<PatientSelectResponse> {
    return await this.prisma.patient.findUniqueOrThrow({
      select: {
        id: true,
        birth_date: true,
        cpf: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            active: true,
            phone: true,
          },
        },
      },
      where: {
        id: userId,
      },
    })
  }

  async findAll(): Promise<PatientSelectResponse[]> {
    return await this.prisma.patient.findMany({
      select: {
        id: true,
        birth_date: true,
        cpf: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            active: true,
            phone: true,
          },
        },
      },
    })
  }

  async findByName(name: string): Promise<PatientSelectResponse[]> {
    return await this.prisma.patient.findMany({
      select: {
        id: true,
        birth_date: true,
        cpf: true,
        user: true,
      },
      where: {
        user: {
          name: {
            contains: name,
          },
        },
      },
    })
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.patient.findFirst({
      include: {
        user: true,
      },
      where: {
        user: {
          email: email,
        },
      },
    })
  }

  async findByUserId(userId: string): Promise<any> {
    return this.prisma.patient.findFirst({
      include: {
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    })
  }

  async save(patient: PatientCreateRequest): Promise<PatientCreateResponse> {
    return await this.prisma.patient.create({
      data: {
        birth_date: patient.birth_date,
        cpf: patient.cpf,
        health_insurance_card_number: patient.health_insurance_card_number,
        user: {
          connect: {
            id: patient.userId,
          },
        },
      },
      select: {
        id: true,
        birth_date: true,
        cpf: true,
        user: true,
      },
    })
  }

  async update(patient: PatientUpdateRequest): Promise<PatientUpdateResponse> {
    return await this.prisma.patient.update({
      data: {
        birth_date: patient.birth_date,
        health_insurance_card_number: patient.health_insurance_card_number,
      },
      where: {
        id: patient.id,
      },
      select: {
        id: true,
        birth_date: true,
        user: true,
      },
    })
  }

  async remove(patient: PatientRemoveRequest): Promise<PatientRemoveResponse> {
    return await this.prisma.patient.delete({
      where: {
        id: patient.id,
      },
      select: {
        id: true,
        birth_date: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            active: true,
            phone: true,
          },
        },
      },
    })
  }
}
