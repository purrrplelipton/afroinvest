import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import $ from "./controllers/index.js"
import { URI } from "./utils/config.js"
import { error, info } from "./utils/logger.js"

const app = express()

mongoose.set({ strictQuery: true, runValidators: true })

info("connecting to MongoDB")
try {
	await mongoose.connect(URI)
	info("connected to MongoDB")
} catch ({ message }) {
	error("error connecting to MongoDB", message)
}

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(morgan("dev"))

app.use("/gwy", $)

export default app
