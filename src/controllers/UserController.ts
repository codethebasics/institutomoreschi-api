import ResponseWrapper from "../interfaces/dto/wrapper/ResponseWrapper";
import UserService from "../services/UserService";

import { 
  UserCreateResponse, 
  UserRemoveResponse, 
  UserSelectResponse, 
  UserUpdateResponse } from "../interfaces/dto/user/UserDTO";

export default class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService();
  }

  async create(req: any) {
    try {
      const user = req

      const valid = user 
        && user.name
        && user.email
        && user.password

      if (!valid) {
        throw "O dados do usuário devem ser informados no corpo da requisição"
      }

      const response = await this.userService.create(user)
      response.password = undefined;

      return new ResponseWrapper<UserCreateResponse>(
        200, 
        'Usuário criado com sucesso', 
        response
      )
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async list() {
    try {
      const response = await this.userService.findAll()
      return new ResponseWrapper<UserSelectResponse[]>(
        200,
        'Listagem efetuada com sucesso',
        response
      )
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async findById(id: string) {
    try {
      const response = await this.userService.findById(id)
      return new ResponseWrapper<UserSelectResponse>(
        200,
        'Busca efetuada com sucesso',
        response
      )
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async update(req: any) {
    try {
      const response = await this.userService.update(req)
      return new ResponseWrapper<UserUpdateResponse>(
        200,
        'Busca efetuada com sucesso',
        response
      )
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async remove(req: any) {
    try {
      const response = await this.userService.remove(req)
      return new ResponseWrapper<UserRemoveResponse>(
        200,
        'Busca efetuada com sucesso',
        response
      )
    } catch (e) {
      console.error(e)
      throw e
    }
  }

}