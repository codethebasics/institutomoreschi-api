import express from "express";
import RoleService from "../services/RoleService";

const router = express.Router();
const roleService = new RoleService();

router
    .route ('/')
    .get   (async (req, res) => await roleService.findAll({}))
    .post  (async (req, res) => await roleService.create(req.body))
    .put   (async (req, res) => await roleService.update(req.body))
    .delete(async (req, res) => await roleService.remove(req.body))

export default router;