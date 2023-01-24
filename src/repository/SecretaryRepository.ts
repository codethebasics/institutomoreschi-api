import { PrismaClient } from "@prisma/client";
import { 
  SecretaryCreateRequest, 
  SecretaryCreateResponse, 
  SecretaryRemoveRequest, 
  SecretaryRemoveResponse, 
  SecretarySelectResponse, 
  SecretaryUpdateRequest, 
  SecretaryUpdateResponse 
} from "../interfaces/dto/secretary/SecretaryDTO";

export default class SecretaryRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<SecretarySelectResponse[]> {
    return await this.prisma.secretary.findMany({
      select: {
        id: true,
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

  async findByName(name: string): Promise<SecretarySelectResponse[]> {
    return await this.prisma.secretary.findMany({
      select: {
        id: true,        
        user: true
      },
      where: {
        user: {
          name: {
            contains: name
          }
        }
      }
    })
  }

  async save(secretary: SecretaryCreateRequest): Promise<SecretaryCreateResponse> {
    return await this.prisma.secretary.create({
      data: {
        id: secretary.id,
        userId: secretary.userId
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
    })
  }

  async update(secretary: SecretaryUpdateRequest): Promise<SecretaryUpdateResponse> {
    return await this.prisma.secretary.update({
      data: {
        id: secretary.id
      },
      where: {
        id: secretary.id
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            updated_at: true
          }
        }
      },
    })
  }

  async remove(secretary: SecretaryRemoveRequest): Promise<SecretaryRemoveResponse> {
    return await this.prisma.secretary.delete({
      where: {
        id: secretary.id
      },
      select: {
        id: true,
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      },
    })
  }

}