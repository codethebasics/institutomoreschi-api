import { PrismaClient } from "@prisma/client"
import { DentistSelectResponse } from "../interfaces/dto/dentist/DentistDTO"
import {
  MedicalHistoryCreateRequest,
  MedicalHistoryRemoveRequest,
  MedicalHistoryRemoveResponse,
  MedicalHistorySelectResponse,
  MedicalHistoryUpdateRequest,
  MedicalHistoryUpdateResponse,
} from "../interfaces/dto/medical-history/MedicalHistoryDTO"
import { PatientSelectResponse } from "../interfaces/dto/patient/PatientDTO"

export default class medicalHistoryRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<MedicalHistorySelectResponse[]> {
    return await this.prisma.medicalHistory.findMany({
      select: {
        id: true,
        description: true,
        dentist: {
          select: {
            id: true,
            cro: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        patient: {
          select: {
            id: true,
            birth_date: true,
            health_insurance_card_number: true,
            userId: true,
            cpf: true,
          },
        },
      },
    })
  }

  async findById(id: string): Promise<MedicalHistorySelectResponse> {
    return await this.prisma.medicalHistory.findUniqueOrThrow({
      where: {
        id: id,
      },
      select: {
        id: true,
        description: true,
        updated_at: true,
        dentist: {
          select: {
            id: true,
            cro: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        patient: {
          select: {
            id: true,
            birth_date: true,
            health_insurance_card_number: true,
            userId: true,
            cpf: true,
          },
        },
      },
    })
  }

  async findByDescription(
    description: string
  ): Promise<MedicalHistorySelectResponse[]> {
    return await this.prisma.medicalHistory.findMany({
      where: {
        description: {
          contains: description,
        },
      },
      select: {
        id: true,
        description: true,
        updated_at: true,
        dentist: {
          select: {
            id: true,
            cro: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        patient: {
          select: {
            id: true,
            birth_date: true,
            health_insurance_card_number: true,
            userId: true,
            cpf: true,
          },
        },
      },
    })
  }

  async findByPatient(
    patient: PatientSelectResponse
  ): Promise<MedicalHistorySelectResponse[]> {
    return await this.prisma.medicalHistory.findMany({
      where: {
        id: patient.id,
      },
      select: {
        id: true,
        description: true,
        updated_at: true,
        dentist: {
          select: {
            id: true,
            cro: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        patient: {
          select: {
            id: true,
            birth_date: true,
            health_insurance_card_number: true,
            userId: true,
            cpf: true,
          },
        },
      },
    })
  }

  async findByDentist(
    dentist: DentistSelectResponse
  ): Promise<MedicalHistorySelectResponse[]> {
    return await this.prisma.medicalHistory.findMany({
      where: {
        id: dentist.id,
      },
      select: {
        id: true,
        description: true,
        updated_at: true,
        dentist: {
          select: {
            id: true,
            cro: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        patient: {
          select: {
            id: true,
            birth_date: true,
            health_insurance_card_number: true,
            userId: true,
            cpf: true,
          },
        },
      },
    })
  }

  async save(medicalHistory: MedicalHistoryCreateRequest) {
    return await this.prisma.medicalHistory.create({
      data: {
        description: medicalHistory.description,
        created_at: new Date(),
        dentist: {
          connect: {
            id: medicalHistory.dentistId,
          },
        },
        patient: {
          connect: {
            id: medicalHistory.patientId,
          },
        },
      },
      select: {
        id: true,
        description: true,
        updated_at: true,
        dentist: {
          select: {
            id: true,
            cro: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        patient: {
          select: {
            id: true,
            birth_date: true,
            userId: true,
            cpf: true,
          },
        },
      },
    })
  }

  async update(
    medicalHistory: MedicalHistoryUpdateRequest
  ): Promise<MedicalHistoryUpdateResponse> {
    return await this.prisma.medicalHistory.update({
      data: {
        description: medicalHistory.description,
        dentistId: medicalHistory.dentist?.id,
        patientId: medicalHistory.patient?.id,
      },
      where: {
        id: medicalHistory.id,
      },
    })
  }

  async remove(
    medicalHistory: MedicalHistoryRemoveRequest
  ): Promise<MedicalHistoryRemoveResponse> {
    return await this.prisma.medicalHistory.delete({
      where: {
        id: medicalHistory.id,
      },
      select: {
        id: true,
        description: true,
        updated_at: true,
      },
    })
  }
}
