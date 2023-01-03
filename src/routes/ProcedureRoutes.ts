import express from "express";
import ProcedureService from "../services/ProcedureService";

const router = express.Router();
const procedureService = new ProcedureService();

router
    .route ('/')
    .get   (async (req, res) => await procedureService.findAll({}))
    .post  (async (req, res) => await procedureService.create(req.body))
    .put   (async (req, res) => await procedureService.update(req.body))
    .delete(async (req, res) => await procedureService.remove(req.body))

export default router;