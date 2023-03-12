import express from "express"
import DashboardService from "../services/DashboardService"

const router = express.Router()
const dashboardService = new DashboardService()

router
  .route("/")
  .get(async (req, res) => res.json(await dashboardService.count()))

export default router
