import express from "express";
import HealthInsuranceService from "../services/HealthInsuranceService";

const router = express.Router();
const healthInsuranceService = new HealthInsuranceService();

router
    .route ('/')
    .get   (async (req, res) => res.json(await healthInsuranceService.findAll(req.body)))
    .post  (async (req, res) => res.json(await healthInsuranceService.create (req.body)))
    .put   (async (req, res) => res.json(await healthInsuranceService.update (req.body)))
    .delete(async (req, res) => res.json(await healthInsuranceService.remove (req.body)))

export default router;