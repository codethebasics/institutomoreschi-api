import { PrismaClient } from "@prisma/client"
import { ExameFisicoExtraOral } from "../interfaces/dto/exame-fisico/ExameFisicoDTO"
import { ExameFisicoExtraOralDTO } from "../interfaces/dto/exame-fisico/ExameFisicoExtraOralDTO"

export default class ExameFisicoExtraOralRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<any> {
    return await this.prisma.extraOralExam.findMany({
      select: {
        id: true,
        skin: true,
        facialSimmetry: true,
        earJawArticulation: true,
        linfonodos: true,
        patient: {
          select: {
            id: true,
            cpf: true,
            birth_date: true,
            user: {
              select: {
                id: true,
                email: true,
                created_at: true,
                updated_at: true,
                active: true,
                name: true,
                phone: true,
              },
            },
          },
        },
      },
    })
  }

  async findById(id: string): Promise<any> {
    return this.prisma.extraOralExam.findUnique({
      select: {
        id: true,
        skin: true,
        facialSimmetry: true,
        earJawArticulation: true,
        linfonodos: true,
        patient: {
          select: {
            id: true,
            cpf: true,
            birth_date: true,
            user: {
              select: {
                id: true,
                email: true,
                created_at: true,
                updated_at: true,
                active: true,
                name: true,
                phone: true,
              },
            },
          },
        },
      },
      where: {
        id: id,
      },
    })
  }

  async create(extraOralExam: any): Promise<any> {
    return await this.prisma.extraOralExam.create({
      data: {
        patientId: extraOralExam.patientId,
        skin: extraOralExam.skin,
        facialSimmetry: extraOralExam.facialSimmetry,
        earJawArticulation: extraOralExam.earJawArticulation,
        linfonodos: extraOralExam.linfonodos,
      },
    })
  }

  async update(extraOralExam: any): Promise<any> {
    return await this.prisma.extraOralExam.update({
      data: {
        skin: extraOralExam.skin,
        facialSimmetry: extraOralExam.facialSimmetry,
        earJawArticulation: extraOralExam.earJawArticulation,
        linfonodos: extraOralExam.linfonodos,
        patient: {
          connect: extraOralExam.patient,
        },
      },
      where: {
        id: extraOralExam.id,
      },
    })
  }

  async remove(extraOralExam: any): Promise<any> {
    return await this.prisma.extraOralExam.delete({
      where: {
        id: extraOralExam.id,
      },
      select: {
        skin: extraOralExam.skin,
        facialSimmetry: extraOralExam.facialSimmetry,
        earJawArticulation: extraOralExam.earJawArticulation,
        linfonodos: extraOralExam.linfonodos,
      },
    })
  }
}
