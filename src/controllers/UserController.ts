import UserService from "../services/UserService";

export default class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService();
  }

  async create(req: any) {
    try {
      const user = req.data.user

      const valid = user 
        && user.name
        && user.email
        && user.password

      if (!valid) {
        throw "O dados do usuário devem ser informados no corpo da requisição"
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