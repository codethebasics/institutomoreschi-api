import express from "express"
import ResponseWrapper from "../interfaces/dto/wrapper/ResponseWrapper"
import AuthController from "../controllers/AuthController"

const router = express.Router()

router.route("/signin").post(async (req, res) => await signIn(req, res))

router.route("/signout").post(async (req, res) => await signOut(req, res))

async function signIn(req: any, res: any) {
  try {
    const { email, password } = req.body
    const authController = new AuthController({ email, password })
    res.status(200).json(await authController.login())
  } catch (e: any) {
    res.status(500).json({
      message: e.message,
    })
  }
}

async function signOut(req: any, res: any) {
  try {
    const { email, password } = req.body
    const authController = new AuthController({ email, password })
    res.status(200).json(await authController.logout())
  } catch (e) {
    console.error(e)
    return new ResponseWrapper<any>(500, "Erro durante o logout do usuário", e)
  }
}

export default router
