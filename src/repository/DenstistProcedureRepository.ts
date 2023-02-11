import { PrismaClient, ProcedureApproval } from "@prisma/client"
import {
  DentistProcedureCreateRequest,
  DentistProcedureRemoveRequest,
  DentistProcedureRemoveResponse,
  DentistProcedureSelectResponse,
  DentistProcedureUpdateRequest,
  DentistProcedureUpdateResponse,
} from "../interfaces/dto/dentist-procedure/DentistProcedureDTO"

export default class DentistProcedureRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<DentistProcedureSelectResponse[]> {
    return await this.prisma.dentistProcedure.findMany()
  }

  async findById(
    procedureId: string,
    dentistId: string,
    patientId: string
  ): Promise<DentistProcedureSelectResponse> {
    return await this.prisma.dentistProcedure.findUniqueOrThrow({
      where: {
        dentistId_procedureId_patientId: {
          dentistId: dentistId,
          patientId: patientId,
          procedureId: procedureId,
        },
      },
    })
  }

  async save(
    dentistProcedure: DentistProcedureCreateRequest
  ): Promise<DentistProcedureSelectResponse> {
    return await this.prisma.dentistProcedure.create({
      data: {
        ...dentistProcedure,
        scheduled_at: new Date(),
        approved: ProcedureApproval.NOT_APPROVED,
      },
    })
  }

  async update(
    dentistProcedure: DentistProcedureUpdateRequest
  ): Promise<DentistProcedureUpdateResponse> {
    return await this.prisma.dentistProcedure.update({
      data: { ...dentistProcedure, scheduled_at: new Date() },
      where: {
        dentistId_procedureId_patientId: {
          dentistId: dentistProcedure.dentistId,
          patientId: dentistProcedure.patientId,
          procedureId: dentistProcedure.procedureId,
        },
      },
    })
  }

  async remove(
    dentistProcedure: DentistProcedureRemoveRequest
  ): Promise<DentistProcedureRemoveResponse> {
    return await this.prisma.dentistProcedure.delete({
      where: {
        dentistId_procedureId_patientId: {
          dentistId: dentistProcedure.dentistId,
          patientId: dentistProcedure.patientId,
          procedureId: dentistProcedure.procedureId,
        },
      },
    })
  }
}
