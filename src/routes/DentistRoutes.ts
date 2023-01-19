import express from "express";
import DentistService from "../services/DentistService";

const router = express.Router();
const dentistService = new DentistService();

router
    .route ('/')
    .get   (async (req, res) => res.json(await dentistService.findAll()))
    .post  (async (req, res) => res.json(await dentistService.create (req.body)))
    .put   (async (req, res) => res.json(await dentistService.update (req.body)))
    .delete(async (req, res) => res.json(await dentistService.remove (req.body)))

export default router;