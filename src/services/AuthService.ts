import jwt from "jsonwebtoken"
import AuthRepository from "../repository/AuthRepository"
import argon2 from "argon2"

import { AuthRequest, AuthResponse } from "../interfaces/dto/auth/AuthDTO"

export interface IAuthService {
  login(data: AuthRequest): Promise<AuthResponse>
  logout(): Promise<Boolean>
}

export default class AuthService implements IAuthService {
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthRepository()
  }

  async login(data: AuthRequest): Promise<AuthResponse> {
    try {
      console.log("AuthService.login() > data", data)

      const { email, password } = data

      if (!email || !password) {
        throw new Error("Os dados de autenticação devem ser informados")
      }

      const _user = await this.authRepository.login(email)

      if (!_user.password) {
        throw new Error("O usuário não possui um password cadastrado")
      }

      const passwordMatches = await argon2.verify(_user.password, password)

      if (_user && passwordMatches) {
        const token = jwt.sign(
          {
            id: _user.id,
            name: _user.name,
            email: _user.email,
          },
          process.env.JWT_SECRET || "",
          { expiresIn: 5000 }
        )

        return {
          user: _user,
          token: token,
        }
      } else {
        throw "Credenciais inválidas"
      }
    } catch (e: any) {
      throw e
    }
  }

  async logout(): Promise<Boolean> {
    console.log("AuthService.login() > logout")
    return true
  }
}
