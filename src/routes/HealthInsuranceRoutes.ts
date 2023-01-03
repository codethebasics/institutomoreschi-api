import express from "express";
import HealthInsuranceService from "../services/HealthInsuranceService";

const router = express.Router();
const healthInsuranceService = new HealthInsuranceService();

router
    .route ('/')
    .get   (async (req, res) => await healthInsuranceService.findAll({}))
    .post  (async (req, res) => await healthInsuranceService.create(req.body))
    .put   (async (req, res) => await healthInsuranceService.update(req.body))
    .delete(async (req, res) => await healthInsuranceService.remove(req.body))

export default router;