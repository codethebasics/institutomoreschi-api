import express from "express";
import PatientService from "../services/PatientService";

const router = express.Router();
const patientService = new PatientService();

router
    .route ('/')
    .get(async (req, res) => {
        const { name } = req.query

        if (name) {
            res.json(await patientService.findByName(name.toString()))
        } else {
            res.json(await patientService.findAll(req.body))
        }
    })
    .post  (async (req, res) => res.json(await  patientService.create (req.body)))
    .put   (async (req, res) => res.json(await  patientService.update (req.body)))
    .delete(async (req, res) => res.json(await  patientService.remove (req.body)))

export default router;