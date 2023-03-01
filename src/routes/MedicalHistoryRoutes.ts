import express from "express"
import MedicalHistoryService from "../services/MedicalHistoryService"

const router = express.Router()
const medicalHistoryService = new MedicalHistoryService()

router
  .route("/")
  .get(async (req, res) => res.json(await medicalHistoryService.findAll()))
  .post(async (req, res) =>
    res.json(await medicalHistoryService.create(req.body))
  )
  .put(async (req, res) =>
    res.json(await medicalHistoryService.update(req.body))
  )
  .delete(async (req, res) =>
    res.json(await medicalHistoryService.remove(req.body))
  )

router
  .route("/id/:id")
  .get(async (req, res) => res.json(await findById(req, res)))

router
  .route("/patientId/:id")
  .get(async (req, res) => res.json(await findByPatient(req, res)))

async function findById(req: any, res: any): Promise<any> {
  try {
    const { id } = req.params
    if (id) {
      return await medicalHistoryService.findById(id)
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

async function findByPatient(req: any, res: any): Promise<any> {
  try {
    const { id } = req.params
    if (id) {
      return await medicalHistoryService.findByPatient(id)
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default router
