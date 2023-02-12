import express from "express"
import ExameFisicoIntraOralService from "../services/ExameFisicoIntraOralService"

const router = express.Router()
const exameFisicoIntraOralService = new ExameFisicoIntraOralService()

router
  .route("/")
  .get(async (req, res) =>
    res.json(await exameFisicoIntraOralService.findAll())
  )
  .post(async (req, res) =>
    res.json(await exameFisicoIntraOralService.create(req.body))
  )
  .put(async (req, res) =>
    res.json(await exameFisicoIntraOralService.update(req.body))
  )
  .delete(async (req, res) =>
    res.json(await exameFisicoIntraOralService.remove(req.body))
  )

router
  .route("/id/:id")
  .get(async (req, res) => await exameFisicoIntraOralService.findById(req.body))
