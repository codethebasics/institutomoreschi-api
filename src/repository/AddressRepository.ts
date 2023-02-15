import { PrismaClient } from "@prisma/client"

export default class AddressRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<any> {
    return await this.prisma.address.findMany({
      select: {
        id: true,
        cep: true,
        logradouro: true,
        complemento: true,
        bairro: true,
        cidade: true,
        uf: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            active: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    })
  }

  async findById(id: string): Promise<any> {
    return await this.prisma.address.findUnique({
      select: {
        id: true,
        cep: true,
        logradouro: true,
        complemento: true,
        bairro: true,
        cidade: true,
        uf: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            active: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
      where: {
        id: id,
      },
    })
  }

  async findByUser(user: any): Promise<any> {
    return await this.prisma.address.findMany({
      select: {
        id: true,
        cep: true,
        logradouro: true,
        complemento: true,
        bairro: true,
        cidade: true,
        uf: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            active: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
      where: {
        userId: user.id,
      },
    })
  }

  async create(address: any): Promise<any> {
    return await this.prisma.address.create({
      data: {
        cep: address.cep,
        logradouro: address.logradouro,
        complemento: address.complemento,
        bairro: address.bairro,
        cidade: address.cidade,
        uf: address.uf,
        userId: address.userId,
      },
    })
  }

  async update(address: any) {
    return await this.prisma.address.update({
      data: {
        cep: address.cep,
        logradouro: address.logradouro,
        complemento: address.complemento,
        bairro: address.bairro,
        cidade: address.cidade,
        uf: address.uf,
      },
      where: {
        id: address.id,
      },
    })
  }

  async remove(address: any) {
    return await this.prisma.address.delete({
      where: {
        id: address.id,
      },
    })
  }
}
