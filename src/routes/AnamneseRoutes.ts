import express from "express"
import AnamneseService from "../services/AnamneseService"

const router = express.Router()
const anamneseService = new AnamneseService()

router
  .route("/")
  .get(async (req, res) => res.json(await anamneseService.findAll()))
  .post(async (req, res) => res.json(await anamneseService.create(req.body)))

router
  .route("/id/:id")
  .get(async (req, res) => await findById(req, res))
  .put(async (req, res) => await update(req, res))
  .delete(async (req, res) => await remove(req, res))

export default router

async function findById(req: any, res: any) {
  const { id } = req.params
  if (!id) {
    res.status(400).json({ message: "O id da anamnese deve ser informado" })
  }
  const response = await anamneseService.findById(id)
  res.status(200).json(response)
}

async function update(req: any, res: any) {
  try {
    const { id } = req.params
    if (!id) {
      throw new Error("O id da anamnese deve ser informado")
    }
    const response = await anamneseService.update({ ...req.body, id: id })
    res.status(200).json(response)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

async function remove(req: any, res: any) {
  const { id } = req.params
  if (!id) {
    res.status(400).json({ message: "O id da anamnese deve ser informado" })
  }
  const response = await anamneseService.remove({
    id: id,
  })
  res.status(200).json(response)
}
