import express from "express";
import UserService from "../services/UserService";
import UserController from "../controllers/UserController";

const router = express.Router();
const userController = new UserController()
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
    .post(async (req, res) => {
        try {
            res.json(await userController.create(req.body))
        } catch (e) {
            res.json({
                status: 500,
                message: 'Erro durante a criação do usuário',
                cause: e
            })
        }
    })
    .put   (async (req, res) => res.json(await userService.update(req.body)))
    .delete(async (req, res) => res.json(await userService.remove(req.body)))

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