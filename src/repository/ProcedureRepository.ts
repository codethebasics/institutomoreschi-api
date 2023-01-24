import { PrismaClient } from "@prisma/client";
import { ProcedureCreateRequest, ProcedureCreateResponse, ProcedureSelectResponse, ProcedureUpdateRequest, ProcedureUpdateResponse, ProcedureRemoveRequest, ProcedureRemoveResponse } from "../interfaces/dto/procedure/ProcedureDTO";

export default class ProcedureRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<ProcedureSelectResponse[]> {
    return await this.prisma.procedure.findMany({
      select: {
        id: true,
        name: true,
        price: true
      }      
    })
  }

  async findByName(name: string): Promise<ProcedureSelectResponse[]> {
    return await this.prisma.procedure.findMany({
      select: {
        id: true,
        name: true,
        price: true
      },
      where: {
        name: name
      }
    })
  }

  async save(procedure: ProcedureCreateRequest): Promise<ProcedureCreateResponse> {
    return await this.prisma.procedure.create({
      data: {
        name: procedure.name,
        price: procedure.price
      }
    })
  }

  async update(procedure: ProcedureUpdateRequest): Promise<ProcedureUpdateResponse> {
    return await this.prisma.procedure.update({
      data: {
        name: procedure.name,
        price: procedure.price
      },
      where: {
        id: procedure.id
      }
    })
  }

  async remove(procedure: ProcedureRemoveRequest): Promise<ProcedureRemoveResponse> {
    return await this.prisma.procedure.delete({
      where: {
        id: procedure.id
      },
      select: {
        id: true,
        name: true,
        price: true
      },
    })
  }

}