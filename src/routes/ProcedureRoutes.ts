import express from "express";
import ProcedureService from "../services/ProcedureService";

const router = express.Router();
const procedureService = new ProcedureService();

router
    .route ('/')
    .get   (async (req, res) => res.json(await procedureService.findAll()))
    .post  (async (req, res) => res.json(await procedureService.create (req.body)))
    .put   (async (req, res) => res.json(await procedureService.update (req.body)))
    .delete(async (req, res) => res.json(await procedureService.remove (req.body)))

export default router;