import express from "express";
import predictionwebhook from './replicateprediction/index'
import modelwebhook from "./replicatemodel/index"
import subscription from "./revenuecat/index"
const router = express.Router()


router.use("/predictionwebhook",predictionwebhook)

router.use("/modelwebhook",modelwebhook)

router.use("/subscription",subscription)

export default router