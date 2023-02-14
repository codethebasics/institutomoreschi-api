import express from "express"
import ExameFisicoExtraOralService from "../services/ExameFisicoExtraOralService"

const router = express.Router()
const exameFisicoExtraOralService = new ExameFisicoExtraOralService()

router
  .route("/")
  .get(async (req, res) => await findAll(req, res))
  .post(async (req, res) => await create(req, res))
  .put(async (req, res) => await update(req, res))
  .delete(async (req, res) => await remove(req, res))

router.route("/id/:id").get(async (req, res) => await findById(req, res))

async function findAll(req: any, res: any) {
  try {
    const response = await exameFisicoExtraOralService.findAll()
    res.status(200).json(response)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

async function findById(req: any, res: any) {
  try {
    const { id } = req.params
    if (!id) {
      throw new Error("O id do exame deve ser informado")
    }
    const response = await exameFisicoExtraOralService.findById(id)
    res.status(200).json(response)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

async function create(req: any, res: any) {
  try {
    const exameFisicoExtraOral = req.body
    if (!exameFisicoExtraOral) {
      throw new Error(
        "O exame físico deve ser informado no corpo da requisição"
      )
    }
    const response = await exameFisicoExtraOralService.create(
      exameFisicoExtraOral
    )
    res.status(200).json(response)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

async function update(req: any, res: any) {
  try {
    const exameFisicoExtraOral = req.body
    if (!exameFisicoExtraOral) {
      throw new Error(
        "O exame físico deve ser informado no corpo da requisição"
      )
    }
    const response = await exameFisicoExtraOralService.update(
      exameFisicoExtraOral
    )
    res.status(200).json(response)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

async function remove(req: any, res: any) {
  try {
    const exameFisicoExtraOral = req.body
    if (!exameFisicoExtraOral) {
      throw new Error(
        "O exame físico deve ser informado no corpo da requisição"
      )
    }
    if (!exameFisicoExtraOral.id) {
      throw new Error("O id do exame físico deve ser informado")
    }
    const response = await exameFisicoExtraOralService.remove(req.body)
    res.status(200).json(response)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export default router
