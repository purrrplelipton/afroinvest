import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import $ from "./controllers/index.js"
import { URI } from "./utils/config.js"
import { ErrorHandler, UnknownEndpoint } from "./utils/middleware.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

const index$path = resolve(__dirname, "dist", "index.html")

app.use(express.json())
app.use(morgan("dev"))

app.use("/gwy", $)
app.get("*", (_, res) => res.sendFile(index$path))

app.use(ErrorHandler)
app.use(UnknownEndpoint)

export default app
