import UserService from "../services/UserService";
import { UserCreateRequest, UserRemoveRequest, UserUpdateRequest } from "../interfaces/dto/user/UserDTO";

export default class UserController {
  private userService: UserService;
  private isFetching: boolean = false;

  constructor() {
    this.userService = new UserService()
  }

  async findAll() {    
    return await this.userService.findAll();
  }

  findById(id: string) {
    this.isFetching = true
    this.userService.findById(id)
      .catch(e => {
        return {
          message: 'Erro durante a busca de usuário pelo id',
          cause: e
        }
      })
      .finally(() => this.isFetching = false)
  }

 findByName(name: string) {
  this.isFetching = true
    this.userService.findByName(name)
      .catch(e => {
        return {
          message: 'Erro durante a busca de usuário pelo nome',
          cause: e
        }
      })
      .finally(() => this.isFetching = false)
  }

 findByEmail(email: string) {
    this.isFetching = true
    this.userService.findByEmail(email)
      .catch(e => {
        return {
          message: 'Erro durante a busca de usuário pelo email',
          cause: e
        }
      })
      .finally(() => this.isFetching = false)
  }

 create(user: UserCreateRequest) {
    this.isFetching = true
    this.userService.create(user)
      .catch(e => {
        return {
          message: 'Erro durante a criação do usuário',
          cause: e
        }
      })
      .finally(() => this.isFetching = false)
  }

  update(user: UserUpdateRequest) {
    this.isFetching = true
    this.userService.update(user)
      .catch(e => {
        return {
          message: 'Erro durante a atualização do usuário',
          cause: e
        }
      })
      .finally(() => this.isFetching = false)
  }

  remove(user: UserRemoveRequest) {
    this.isFetching = true
    this.userService.remove(user)
      .catch(e => {
        return {
          message: 'Erro durante a remoção do usuário',
          cause: e
        }
    })
    .finally(() => this.isFetching = false)
  }

  removeByEmail(email: string) {
    this.isFetching = true
    this.userService.removeByEmail(email)
      .catch(e => {
        return {
          message: 'Erro durante a remoção do usuário pelo email',
          cause: e
        }
      })
      .finally(() => this.isFetching = false)
  }

}