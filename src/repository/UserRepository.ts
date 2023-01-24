import { PrismaClient } from "@prisma/client";
import { UserCreateRequest, UserRemoveRequest, UserRemoveResponse, UserSelectResponse, UserUpdateRequest, UserUpdateResponse } from "../interfaces/dto/user/UserDTO";

export default class UserRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<UserSelectResponse[]> {
    return await this.prisma.user.findMany({        
      select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
          active: true,
          user_role: {
              select: {
                  role: {
                      select: {
                          id: true,
                          name: true,
                          description: true
                      }
                  }
              }
          }
      }
    })
  }

  async findById(id: string): Promise<UserSelectResponse> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
        active: true,
        user_role: true
      }
    })
  }

  async findByName(name: string): Promise<UserSelectResponse[]> {
    return await this.prisma.user.findMany({
      where: {
        name: name
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
        active: true,
        user_role: true
      }
    })
  }

  async findByEmail(email: string): Promise<UserSelectResponse> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        email: email
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
        active: true,
        user_role: true
      }
    })
  }

  async save(user: UserCreateRequest) {
    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        active: user?.active,
        created_at: new Date(),
        updated_at: new Date()
      }
    })
  }

  async remove(user: UserRemoveRequest): Promise<UserRemoveResponse> {
    return await this.prisma.user.delete({
      where: {
          id: user.id
      },
      select: {
          id: true,
          name: true,
          email: true
      }
    })
  }

  async removeByEmail(email: string): Promise<UserRemoveResponse> {
    return await this.prisma.user.delete({
      where: {
          email: email
      },
      select: {
          id: true,
          name: true,
          email: true
      }
    })
  }

  async update(user: UserUpdateRequest): Promise<UserUpdateResponse> {
    return await this.prisma.user.update({
      data: user,
      where: {
          id: user.id
      }
    })
  }
  
}