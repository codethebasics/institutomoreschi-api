import express from "express";
import PatientService from "../services/PatientService";

const router = express.Router();
const patientService = new PatientService();

router
    .route ('/')
    .get   (async (req, res) => await patientService.findAll(req.body))
    .post  (async (req, res) => await patientService.create (req.body))
    .put   (async (req, res) => await patientService.update (req.body))
    .delete(async (req, res) => await patientService.remove (req.body))

export default router;