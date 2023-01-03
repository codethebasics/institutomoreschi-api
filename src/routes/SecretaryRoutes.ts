import express from "express";
import SecretaryService from "../services/SecretaryService";

const router = express.Router();
const secretaryService = new SecretaryService();

router
    .route ('/')
    .get(async (req, res) => {
        const { name } = req.query

        if (name) {
            res.json(await secretaryService.findByName(name.toString()))
        } else {
            res.json(await secretaryService.findAll(req.body))
        }        
    })
    .post  (async (req, res) => res.json(await secretaryService.create (req.body)))
    .put   (async (req, res) => res.json(await secretaryService.update (req.body)))
    .delete(async (req, res) => res.json(await secretaryService.remove (req.body)))

export default router;