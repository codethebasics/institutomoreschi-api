import express from 'express'
import { Router, Request, Response } from 'express'
import { request } from 'http'
import { PrismaClient } from '@prisma/client'

const app = express()
const route = Router()
const prisma = new PrismaClient()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello world' })
})

route.get('/users', async (req: Request, res: Response) => {
    res.json(await prisma.user.findMany())
})

route.post('/users', async(req: Request, res: Response) => {
    res.json(await prisma.user.create({...req.body}))
})

app.use(route)

app.listen(3333, () => 'Server is running on port 3333')