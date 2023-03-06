import express from "express"
import UserService from "../services/UserService"
import UserController from "../controllers/UserController"

const router = express.Router()
const userController = new UserController()
const userService = new UserService()

router
  .route("/")
  .get(async (req, res) => await list(req, res))
  .post(async (req, res) => await create(req, res))
  .put(async (req, res) => await update(req, res))
  .delete(async (req, res) => await remove(req, res))

router.route("/id/:id").get(async (req, res) => await findById(req, res))
router
  .route("/email/:email")
  .get(async (req, res) => await findByEmail(req, res))

async function list(req: any, res: any) {
  const { id, name, email } = req.query

  if (id) {
    res.json(await findById(req, res))
  } else if (name) {
    res.json(await userService.findByName(name.toString()))
  } else if (email) {
    res.json(await userService.findByEmail(email.toString()))
  } else {
    res.json(await userService.findAll())
  }
}

async function findById(req: any, res: any) {
  const { id } = req.params
  try {
    if (!id) {
      throw "O ID do usuário precisa ser informado"
    }
    res.status(200).json(await userController.findById(id))
  } catch (e) {
    console.error(e)
    res.status(500).json({
      status: 500,
      message: "Erro durante a consulta do usuário",
      cause: e,
    })
  }
}

async function findByEmail(req: any, res: any) {
  const { email } = req.params
  try {
    if (!email) {
      throw "O Email do usuário precisa ser informado"
    }
    res.status(200).json(await userController.findByEmail(email))
  } catch (e) {
    console.error(e)
    res.status(500).json({
      status: 500,
      message: "Erro durante a consulta do usuário",
      cause: e,
    })
  }
}

async function create(req: any, res: any) {
  try {
    res.status(200).json(await userController.create(req.body))
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Erro durante a criação do usuário",
      cause: e,
    })
  }
}

async function update(req: any, res: any) {
  try {
    res.status(200).json(await userService.update(req.body))
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Erro durante a alteração do usuário",
      cause: e,
    })
  }
}

async function remove(req: any, res: any) {
  try {
    res.status(200).json(await userController.remove(req))
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Erro durante a remoção do usuário",
      cause: e,
    })
  }
}

export default router
