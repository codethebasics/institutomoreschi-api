import {
  UserCreateRequest,
  UserCreateResponse,
  UserRemoveRequest,
  UserRemoveResponse,
  UserSelectResponse,
  UserUpdateRequest,
  UserUpdateResponse,
} from "../interfaces/dto/user/UserDTO"
import UserRepository from "../repository/UserRepository"

export default class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async count(): Promise<number> {
    try {
      const response = await this.userRepository.count()
      return response
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async findAll(): Promise<UserSelectResponse[]> {
    try {
      const response = await this.userRepository.findAll()
      return response
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async findById(id: string): Promise<UserSelectResponse> {
    try {
      return await this.userRepository.findById(id)
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async findByName(name: string): Promise<UserSelectResponse[]> {
    try {
      return await this.userRepository.findByName(name)
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async findByEmail(email: string): Promise<UserSelectResponse> {
    try {
      return await this.userRepository.findByEmail(email)
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async create(user: UserCreateRequest): Promise<UserCreateResponse> {
    try {
      if (!user.password || !user.phone) {
        throw "Os parâmetros do usuário devem ser informados corretamente"
      }
      const createdUser = await this.userRepository.save(user)
      const rolesAdded = await this.userRepository.addRolesToUser(
        createdUser,
        user.user_role
      )

      return createdUser
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async update(user: UserUpdateRequest): Promise<UserUpdateResponse> {
    try {
      return await this.userRepository.update(user)
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async remove(user: UserRemoveRequest): Promise<UserRemoveResponse> {
    try {
      if (!user) throw "O usuário deve ser informado"
      if (!user.id) throw "O id do usuário deve ser informado"
      return await this.userRepository.remove(user)
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async removeByEmail(email: string): Promise<UserRemoveResponse> {
    try {
      if (!email) throw "O email do usuário deve ser informado"
      return await this.userRepository.removeByEmail(email)
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }
}
