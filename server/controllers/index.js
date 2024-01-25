import { Router } from "express"
import RiskModel from "../models/index.js"

const $ = Router()

$.get("/:score", async ({ params }, rs) => {
	try {
		const data = await RiskModel.findOne({ score: parseInt(params.score, 10) })

		if (!data) {
			return rs.status(404).json({ error: "Data not found" })
		}

		rs.json(data)
	} catch ({ message }) {
		console.error({ message })
		rs.status(500).json({ error: "Internal Server Error" })
	}
})

export default $
