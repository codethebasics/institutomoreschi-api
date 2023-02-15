import express from "express"
import ArchiveService from "../services/ArchiveService"

const router = express.Router()
const archiveService = new ArchiveService()

router
  .route("/")
  .get(async (req, res) => res.json(await archiveService.findAll()))
  .post(async (req, res) => res.json(await archiveService.create(req.body)))

router
  .route("/id/:id")
  .get(async (req, res) => res.json(await archiveService.findById(req.body)))
  .put(async (req, res) => res.json(await archiveService.update(req.body)))
  .delete(async (req, res) => res.json(await archiveService.remove(req.body)))

async function findAll(req: any, res: any) {
  try {
    const response = await archiveService.findAll()
    res.status(200).json(response)
  } catch (e: any) {
    res.status(400).json(e.message)
  }
}

async function findById(req: any, res: any) {
  try {
    const { id } = req.params
    const response = await archiveService.findById(id)
    res.status(200).json(response)
  } catch (e: any) {
    res.status(400).json(e.message)
  }
}

async function create(req: any, res: any) {
  try {
    const archive = req.body
    const response = await archiveService.create(archive)
    res.status(200).json(response)
    if (!archive) {
      throw new Error("O arquivo deve ser informado no corpo da requisição")
    }
  } catch (e: any) {
    res.status(400).json(e.message)
  }
}

async function update(req: any, res: any) {
  try {
    const archive = req.body
    if (!archive) {
      throw new Error("O arquivo dese ser informado no corpo da requisição")
    }
    if (!archive.id) {
      throw new Error("O id do arquivo deve ser informado")
    }
    const response = await archiveService.update(archive)
    res.status(200).json(response)
  } catch (e: any) {
    res.status(400).json(e.message)
  }
}

async function remove(req: any, res: any) {
  try {
    const archive = req.body
    if (!archive) {
      throw new Error("O arquivo dese ser informado no corpo da requisição")
    }
    if (!archive.id) {
      throw new Error("O id do arquivo deve ser informado")
    }
    const response = await archiveService.remove(archive)
    res.status(200).json(response)
  } catch (e: any) {
    res.status(400).json(e.message)
  }
}

export default router
