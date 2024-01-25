import { Router } from "express"
import RiskModel from "../models/index.js"

const $ = Router()

$.get("/:score", async ({ params }, { status, json }) => {
	try {
		const data = await RiskModel.findOne({ score: parseInt(params.score, 10) })

		if (!data) {
			return status(404).json({ error: "Data not found" })
		}

		json(data)
	} catch ({ message }) {
		console.error({ message })
		status(500).json({ error: "Internal Server Error" })
	}
})

export default $
