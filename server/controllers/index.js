import { validateEmail, validatePasswordStrength } from "@afroinvest/shared_utils"
import { hash } from "bcrypt"
import { Router } from "express"
import { RiskModel, UserModel } from "../models/index.js"
import { HASH_COMPLEXITY } from "../utils/config.js"

const $ = Router()

$.post("/users/auth", async ({ body }, rs) => {
	try {
		const { email, password } = body
		if (!validateEmail(email)) {
			return rs.status(400).json({ error: "Invalid email address" })
		}
		if (!validatePasswordStrength(password)) {
			return rs.status(400).json({ error: "Password does not meet strength requirements" })
		}

		const data = await UserModel.findOne({ email })
		if (data) {
			return rs.status(409).json({ error: "Email already registered" })
		}

		const hashedPassword = await hash(password, HASH_COMPLEXITY)

		const user = new UserModel({ email, password: hashedPassword })
		const savedUser = await user.save()

		console.log("User registered successfully:", savedUser._id)

		rs.status(201).json(savedUser)
	} catch ({ message, stack }) {
		console.error("Registration error", message, stack)
		rs.status(500).json({ error: "Internal Server Error" })
	}
})

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
