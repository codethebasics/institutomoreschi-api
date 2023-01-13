import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { Router } from 'express'

import Routes from './routes/index'

const app = express()
const route = Router()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/users", Routes.UserRoutes);
app.use("/roles", Routes.RoleRoutes);
app.use("/patients", Routes.PatientRoutes);
app.use("/dentists", Routes.DentistRoutes);
app.use("/secretaries", Routes.SecretaryRoutes);
app.use("/procedures", Routes.ProcedureRoutes);
app.use("/health-insurance", Routes.HealthInsuranceRoutes);

app.use(route)

app.listen(3333, () => 'Server is running on port 3333')