import argon2 from 'argon2';

import { PrismaClient } from "@prisma/client";
import { DentistCreateRequest, DentistCreateResponse, DentistRemoveByCRORequest, DentistRemoveByIdRequest, DentistRemoveResponse, DentistSelectResponse, DentistUpdateRequest, DentistUpdateResponse } from "../interfaces/dto/dentist/DentistDTO";

export default class DentistRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<DentistSelectResponse[]> {
    return await this.prisma.dentist.findMany({
      select: {
        id: true,
        cro: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            active: true
        }
        }
      }      
    })
  }

  async findByCRO(cro: string): Promise<DentistSelectResponse> {
    return await this.prisma.dentist.findUniqueOrThrow({
      select: {
        id: true,
        cro: true,
        user: true
      },
      where: {
        cro: cro
      }
    })
  }

  async save(dentist: DentistCreateRequest): Promise<DentistCreateResponse> {
    try {
      return await this.prisma.dentist.create({
        data: {
          cro: dentist.cro,
          user: {
            connectOrCreate: {
              create: {
                name: dentist.user?.name,
                email: dentist.user?.email,
                password: await argon2.hash(dentist.user?.password)
              },
              where: {
                email: dentist.user.email
              }
            }
          }
        },
        select: {
          id: true,
          cro: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              password: true
            }
          }
        }
      })
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async update(dentist: DentistUpdateRequest): Promise<DentistUpdateResponse> {
    return await this.prisma.dentist.update({
      data: {
        cro: dentist.cro
      },
      where: {
        id: dentist.id
      },
      select: {
        id: true,
        cro: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  }

  async remove(dentist: DentistRemoveByIdRequest): Promise<DentistRemoveResponse> {
    return await this.prisma.dentist.delete({
      where: {
        id: dentist.id
      },
      select: {
        id: true,
        cro: true,
      }
    })
  }

  async removeByCRO(dentist: DentistRemoveByCRORequest): Promise<DentistRemoveResponse> {
    return await this.prisma.dentist.delete({
      where: {
        cro: dentist.cro
      },
      select: {
        id: true,
        cro: true,
      }
    })
  }

}