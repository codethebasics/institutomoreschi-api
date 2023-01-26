import { Prisma, PrismaClient } from "@prisma/client";
import { 
  HealthInsuranceCreateRequest, 
  HealthInsuranceCreateResponse, 
  HealthInsuranceSelectResponse, 
  HealthInsuranceUpdateRequest, 
  HealthInsuranceRemoveRequest, 
  HealthInsuranceRemoveResponse 
} from "../interfaces/dto/health-insurance/HealthInsuranceDTO";
import e from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export default class HealthInsuranceRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<HealthInsuranceSelectResponse[]> {
    return await this.prisma.healthInsurance.findMany({
      select: {
        id: true,
        name: true,
        code: true
      }      
    })
  }

  async findByName(name: string): Promise<HealthInsuranceSelectResponse[]> {
    return await this.prisma.healthInsurance.findMany({
      select: {
        id: true,
        name: true,
        code: true
      },
      where: {
        name: name
      }
    })
  }

  async findByCode(code: string): Promise<HealthInsuranceSelectResponse> {
    return await this.prisma.healthInsurance.findUniqueOrThrow({
      where: {
        code: code
      },
      select: {
        id: true,
        name: true,
        code: true
      }
    })
  }

  async save(healthInsurance: HealthInsuranceCreateRequest): Promise<HealthInsuranceCreateResponse> {
    return await this.prisma.healthInsurance.create({
      data: {
        name: healthInsurance.name,
        code: healthInsurance.code
      }
    })
  }

  async update(healthInsurance: HealthInsuranceUpdateRequest): Promise<HealthInsuranceCreateResponse> {
    return await this.prisma.healthInsurance.update({
      data: {
        name: healthInsurance.name,
        code: healthInsurance.code
      },
      where: {
        id: healthInsurance.id
      }
    })
  }

  async remove(healthInsurance: HealthInsuranceRemoveRequest): Promise<HealthInsuranceRemoveResponse> {
    try {
      return await this.prisma.healthInsurance.delete({
        where: {
          id: healthInsurance.id
        },
        select: {
          id: true,
          name: true,
          code: true
        },
      })
    } catch(e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if(e.code === 'P2025') {
          console.error('Not found')
        } else {
          console.error('Prisma error')
        }
      } else {
        console.error(e)
      }
      throw e
    }
  }

}