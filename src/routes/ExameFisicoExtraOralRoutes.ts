import express from "express"
import ExameFisicoExtraOralService from "../services/ExameFisicoExtraOralService"

const router = express.Router()
const exameFisicoExtraOralService = new ExameFisicoExtraOralService()

router
  .route("/")
  .get(async (req, res) =>
    res.json(await exameFisicoExtraOralService.findAll())
  )
  .post(async (req, res) =>
    res.json(await exameFisicoExtraOralService.create(req.body))
  )
  .put(async (req, res) =>
    res.json(await exameFisicoExtraOralService.update(req.body))
  )
  .delete(async (req, res) =>
    res.json(await exameFisicoExtraOralService.remove(req.body))
  )

router
  .route("/id/:id")
  .get(async (req, res) => await exameFisicoExtraOralService.findById(req.body))

export default router
