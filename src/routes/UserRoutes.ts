import express from "express";
import querystring from "querystring"
import UserService from "../services/UserService";

const router = express.Router();
const userService = new UserService();

router
    .route('/')
    .get(async (req, res) => {
        const { id, name, email, active } = req.query
        
        if (id) {
            res.json(await userService.findById(id.toString()))
        } else if (name) {
            res.json(await userService.findByName(name.toString()))
        } else if (email) {
            res.json(await userService.findByEmail(email.toString()))
        } else {
            res.json(await userService.findAll())
        }
        
    })
    .post  (async (req, res) => res.json(await userService.create (req.body)))
    .put   (async (req, res) => res.json(await userService.update (req.body)))
    .delete(async (req, res) => res.json(await userService.remove (req.body)))

router
    .route('/id/:id')
    .get(async (req, res) => {
        const { id } = req.params
        
        if (!id) {
            res.status(400).json({message: 'O ID deve ser informado'})
        } else {
            res.json(await userService.findById(id.toString()))
        }

    })


export default router;