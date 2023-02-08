import ResponseWrapper from "../interfaces/dto/wrapper/ResponseWrapper"
import AuthService from "../services/AuthService"
import {
  AuthRequest,
  AuthResponse,
  AuthResponseError,
  SignOutResponse,
  SignOutResponseError,
} from "../interfaces/dto/auth/AuthDTO"

export default class AuthController {
  private email: string
  private password: string

  private authService: AuthService

  constructor(request: AuthRequest) {
    this.email = request.email
    this.password = request.password
    this.authService = new AuthService()
  }

  public get _email() {
    return this.email
  }

  public get _password() {
    return this.password
  }

  public set _email(email: string) {
    this.email = email
  }

  public set _password(password: string) {
    this.password = password
  }

  async login(): Promise<ResponseWrapper<AuthResponse>> {
    try {
      const loginResponse = await this.authService.login({
        email: this.email,
        password: this.password,
      })

      delete loginResponse.user.password

      return new ResponseWrapper<AuthResponse>(
        200,
        "Usuário autenticado com sucesso",
        loginResponse
      )
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async logout(): Promise<
    ResponseWrapper<SignOutResponse | SignOutResponseError>
  > {
    try {
      const signOutResponse = await this.authService.logout()
      return new ResponseWrapper<SignOutResponse>(
        200,
        "Logout realizado com sucesso",
        {
          success: signOutResponse,
        }
      )
    } catch (e: any) {
      return new ResponseWrapper<SignOutResponseError>(
        500,
        "Erro durante a realização do logout",
        {
          message: e.message,
        }
      )
    }
  }
}
