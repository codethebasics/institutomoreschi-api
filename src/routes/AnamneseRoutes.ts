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
  .get(async (req, res) => res.json(await anamneseService.findById(req.body)))
  .put(async (req, res) => res.json(await anamneseService.update(req.body)))
  .delete(async (req, res) => res.json(await anamneseService.remove(req.body)))

export default router
