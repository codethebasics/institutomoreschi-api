import express from 'express'
import { Router, Request, Response } from 'express'
import { request } from 'http'
import { PrismaClient } from '@prisma/client'

import UserService from './services/UserService'

const app = express()
const route = Router()
const prisma = new PrismaClient()
const userService = new UserService(prisma);

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello world' })
})

route.get('/users', async (req: Request, res: Response) => {
    res.json(userService.findAll(req.body.filter))
})

route.post('/users', async(req: Request, res: Response) => {
    res.json(userService.create(req.body.user))
})

app.use(route)

app.listen(3333, () => 'Server is running on port 3333')