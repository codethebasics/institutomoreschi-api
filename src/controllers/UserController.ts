import UserService from "../services/UserService";

export default class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService();
  }

  async create(req: any) {
    try {
      const user = req.data.user

      if (!user) {
        throw "O usuário deve ser informado no corpo da requisição"
      }

      const response = await this.userService.create(user)
      response.password = undefined;

      return {
        status: 200,
        message: 'Usuário criado com sucesso',
        body: response
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}