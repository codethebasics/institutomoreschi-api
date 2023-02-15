import express from "express"
import AddressService from "../services/AddressService"

const router = express.Router()
const addressService = new AddressService()

router
  .route("/")
  .get(async (req, res) => res.json(await addressService.findAll()))
  .post(async (req, res) => res.json(await addressService.create(req.body)))

router
  .route("/id/:id")
  .get(async (req, res) => await findById(req, res))
  .put(async (req, res) => await update(req, res))
  .delete(async (req, res) => await remove(req, res))

router.route("/user/:id").get(async (req, res) => await findByUser(req, res))

export default router

async function findById(req: any, res: any) {
  const { id } = req.params
  if (!id) {
    res.status(400).json({ message: "O id do endereço deve ser informado" })
  }
  const response = await addressService.findById(id)
  res.status(200).json(response)
}

async function findByUser(req: any, res: any) {
  const { id } = req.params
  if (!id) {
    res.status(400).json({ message: "O id do usuário deve ser informado" })
  }
  const response = await addressService.findByUser(id)
  res.status(200).json(response)
}

async function update(req: any, res: any) {
  try {
    const { id } = req.params
    if (!id) {
      throw new Error("O id do endereço deve ser informado")
    }
    const response = await addressService.update({ ...req.body, id: id })
    res.status(200).json(response)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

async function remove(req: any, res: any) {
  const { id } = req.params
  if (!id) {
    res.status(400).json({ message: "O id do endereço deve ser informado" })
  }
  const response = await addressService.remove({
    id: id,
  })
  res.status(200).json(response)
}
