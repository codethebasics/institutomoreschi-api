import express from "express";
import DentistService from "../services/DentistService";

const router = express.Router();
const dentistService = new DentistService();

router
    .route ('/')
    .get   (async (req, res) => await dentistService.findAll(req.body))
    .post  (async (req, res) => await dentistService.create (req.body))
    .put   (async (req, res) => await dentistService.update (req.body))
    .delete(async (req, res) => await dentistService.remove (req.body))

export default router;