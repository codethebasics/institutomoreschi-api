import { PrismaClient } from "@prisma/client"

export default class ExameFisicoIntraOralRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<any> {
    return await this.prisma.intraOralExam.findMany({
      select: {
        id: true,
        lips: true,
        tongue: true,
        buccalFloor: true,
        hardPalate: true,
        softPalate: true,
        mucosaJugal: true,
        mucosaAleolar: true,
        orofaringeRetromolar: true,
        injuryDescription: true,
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
    return await this.prisma.intraOralExam.findUnique({
      select: {
        id: true,
        lips: true,
        tongue: true,
        buccalFloor: true,
        hardPalate: true,
        softPalate: true,
        mucosaJugal: true,
        mucosaAleolar: true,
        orofaringeRetromolar: true,
        injuryDescription: true,
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

  async create(intraOralExam: any): Promise<any> {
    return await this.prisma.intraOralExam.create({
      data: {
        patientId: intraOralExam.patientId,
        lips: intraOralExam.lips,
        tongue: intraOralExam.tongue,
        buccalFloor: intraOralExam.buccalFloor,
        hardPalate: intraOralExam.hardPalate,
        softPalate: intraOralExam.softPalate,
        mucosaJugal: intraOralExam.mucosaJugal,
        mucosaAleolar: intraOralExam.mucosaAleolar,
        orofaringeRetromolar: intraOralExam.orofaringeRetromolar,
        injuryDescription: intraOralExam.injuryDescription,
      },
    })
  }

  async update(intraOralExam: any): Promise<any> {
    return await this.prisma.intraOralExam.update({
      data: {
        id: intraOralExam.id,
        lips: intraOralExam.lips,
        tongue: intraOralExam.tongue,
        buccalFloor: intraOralExam.buccalFloor,
        hardPalate: intraOralExam.hardPalate,
        softPalate: intraOralExam.softPalate,
        mucosaJugal: intraOralExam.mucosaJugal,
        mucosaAleolar: intraOralExam.mucosaAleolar,
        orofaringeRetromolar: intraOralExam.orofaringeRetromolar,
        injuryDescription: intraOralExam.injuryDescription,
      },
      where: {
        id: intraOralExam.id,
      },
    })
  }

  async remove(intraOralExam: any): Promise<any> {
    return await this.prisma.intraOralExam.delete({
      where: {
        id: intraOralExam.id,
      },
      select: {
        id: intraOralExam.id,
        lips: intraOralExam.lips,
        tongue: intraOralExam.tongue,
        buccalFloor: intraOralExam.buccalFloor,
        hardPalate: intraOralExam.hardPalate,
        softPalate: intraOralExam.softPalate,
        mucosaJugal: intraOralExam.mucosaJugal,
        mucosaAleolar: intraOralExam.mucosaAleolar,
        orofaringeRetromolar: intraOralExam.orofaringeRetromolar,
        injuryDescription: intraOralExam.injuryDescription,
      },
    })
  }
}
