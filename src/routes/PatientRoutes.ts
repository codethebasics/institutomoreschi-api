import express from "express"
import PatientService from "../services/PatientService"

const router = express.Router()
const patientService = new PatientService()

router
  .route("/")
  .get(async (req, res) => {
    const { name, email } = req.query

    if (name) {
      res.json(await patientService.findByName(name.toString()))
    } else if (email) {
      res.json(await patientService.findByEmail(email.toString()))
    } else {
      res.json(await patientService.findAll())
    }
  })
  .post(async (req, res) => res.json(await patientService.create(req.body)))
  .put(async (req, res) => res.json(await patientService.update(req.body)))
  .delete(async (req, res) => res.json(await patientService.remove(req.body)))

router.route("/id/:id").get(async (req, res) => await findById(req, res))

async function findById(req: any, res: any): Promise<any> {
  try {
    res.status(200).json({ message: "TODO" })
  } catch (e: any) {
    res.status(500).json({ message: "Erro: " + e.message })
  }
}

export default router
