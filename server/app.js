import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import $ from "./controllers/index.js"
import { URI } from "./utils/config.js"
import { ErrorHandler, UnknownEndpoint } from "./utils/middleware.js"

const app = express()

mongoose.set({ strictQuery: true, runValidators: true })

console.info("connecting to MongoDB")
try {
	await mongoose.connect(URI)
	console.info("connected to MongoDB")
} catch ({ message }) {
	console.error("error connecting to MongoDB", message)
}

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(morgan("dev"))

app.use("/gwy", $)

app.use(ErrorHandler)
app.use(UnknownEndpoint)

export default app
