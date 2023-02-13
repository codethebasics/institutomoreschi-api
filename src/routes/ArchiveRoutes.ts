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

export default router
