

import { PrismaClient } from "@prisma/client";
import { UserSelectResponse } from '../interfaces/dto/user/UserDTO';

export default class AuthRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async login(email: string): Promise<UserSelectResponse> {
    const _email = email.trim()

    const user = await this.prisma.user.findFirst({
      where: {
        email: _email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true
      }
    })
    
    if (!user) {
      throw "Credenciais inválidas"
    }

    return user
  }   
}