import express from "express";
import RoleService from "../services/RoleService";

const router = express.Router();
const roleService = new RoleService();

router
    .route ('/')
    .get   (async (req, res) => res.json(await roleService.findAll(req.body)))
    .post  (async (req, res) => res.json(await roleService.create (req.body)))
    .put   (async (req, res) => res.json(await roleService.update (req.body)))
    .delete(async (req, res) => res.json(await roleService.remove (req.body)))

export default router;