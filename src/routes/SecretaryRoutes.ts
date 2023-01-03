import express from "express";
import SecretaryService from "../services/SecretaryService";

const router = express.Router();
const secretaryService = new SecretaryService();

router
    .route ('/')
    .get   (async (req, res) => await secretaryService.findAll({}))
    .post  (async (req, res) => await secretaryService.create(req.body))
    .put   (async (req, res) => await secretaryService.update(req.body))
    .delete(async (req, res) => await secretaryService.remove(req.body))

export default router;