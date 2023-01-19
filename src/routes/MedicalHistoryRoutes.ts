import express from "express";
import MedicalHistoryService from "../services/MedicalHistoryService";

const router = express.Router()
const medicalHistoryService = new MedicalHistoryService()

router
    .route ('/')
    .get   (async (req, res) => res.json(await medicalHistoryService.findAll(req.body)))
    .post  (async (req, res) => res.json(await medicalHistoryService.create (req.body)))
    .put   (async (req, res) => res.json(await medicalHistoryService.update (req.body)))
    .delete(async (req, res) => res.json(await medicalHistoryService.remove (req.body)))

export default router;