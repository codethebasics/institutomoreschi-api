import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import { Router } from "express"

import Routes from "./routes/index"

const app = express()
const route = Router()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/users", Routes.UserRoutes)
app.use("/roles", Routes.RoleRoutes)
app.use("/patients", Routes.PatientRoutes)
app.use("/dentists", Routes.DentistRoutes)
app.use("/secretaries", Routes.SecretaryRoutes)
app.use("/procedures", Routes.ProcedureRoutes)
app.use("/health-insurance", Routes.HealthInsuranceRoutes)
app.use("/medical-history", Routes.MedicalHistoryRoutes)
app.use("/auth", Routes.AuthRoutes)
app.use("/anamnese", Routes.AnamneseRoutes)
app.use("/archive", Routes.ArchiveRoutes)
app.use("/exame-fisico-extra-oral", Routes.ExameFisicoExtraOralRoutes)
app.use("/exame-fisico-intra-oral", Routes.ExameFisicoIntraOralRoutes)
app.use("/address", Routes.AddressRoutes)
app.use("/upload", Routes.ImageRouter)
app.use("/dashboard", Routes.DashboardRoutes)

app.use(route)

app.listen(3333, () => "Server is running on port 3333")
