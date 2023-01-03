import express from "express";
import UserService from "../services/UserService";

const router = express.Router();
const userService = new UserService();

router
    .route ('/')
    .get   (async (req, res) => res.json(await userService.findAll({})))
    .post  (async (req, res) => res.json(await userService.create(req.body)))
    .put   (async (req, res) => res.json(await userService.update(req.body)))
    .delete(async (req, res) => res.json(await userService.remove(req.body)))

export default router;