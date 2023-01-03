import express from "express";
import querystring from "querystring"
import UserService from "../services/UserService";

const router = express.Router();
const userService = new UserService();

router
    .route('/')
    .get(async (req, res) => {
        const { name, email } = req.query

        if (name) {
            res.json(await userService.findByName(name.toString()))
        } else if (email) {
            res.json(await userService.findByEmail(email.toString()))
        } else {
            res.json(await userService.findAll(req.body))
        }
        
    })
    .post  (async (req, res) => res.json(await userService.create (req.body)))
    .put   (async (req, res) => res.json(await userService.update (req.body)))
    .delete(async (req, res) => res.json(await userService.remove (req.body)))


export default router;