import { PrismaClient } from "@prisma/client"
import { RoleCreateRequest, RoleCreateResponse, RoleDTO, RoleRemoveRequest, RoleRemoveResponse, RoleSelectResponse, RoleUpdateRequest, RoleUpdateResponse } from "../interfaces/dto/role/RoleDTO"

export default class RoleRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<RoleDTO[]> {
    return await this.prisma.role.findMany({        
      select: {
        id: true,
        name: true,
        description: true
      }
    })
  }

  async findById(id: string): Promise<RoleSelectResponse> {
    return await this.prisma.role.findUniqueOrThrow({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })
  }

  async findByName(name: string): Promise<RoleSelectResponse> {
    return await this.prisma.role.findUniqueOrThrow({
      where: {
        name: name
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })
  }

  async save(role: RoleCreateRequest): Promise<RoleCreateResponse> {
    return await this.prisma.role.create({
      data: role,
      select: {
        id: true,
        name: true, 
        description: true
      }
    })
  }

  async remove(role: RoleRemoveRequest): Promise<RoleRemoveResponse> {
    return await this.prisma.role.delete({
      where: {
        id: role.id
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })
  }

  async update(role: RoleUpdateRequest): Promise<RoleUpdateResponse> {
    return await this.prisma.role.update({
      data: {
        name: role.name,
        description: role.description
      },
      where: {
        id: role.id
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })
  }
}