import { validatePasswordStrength } from "@afroinvest/shared_utils"
import { compare, hash } from "bcrypt"
import { Router } from "express"
import _pkg from "jsonwebtoken"
import sanitize from "sanitize-html"
import __pkg from "validator"
import { RiskModel, UserModel } from "../models/index.js"
import { HASH_COMPLEXITY, JWT_SECRET } from "../utils/config.js"

const { sign } = _pkg
const { isEmail } = __pkg

const $ = Router()

$.post("/users/authenticate", async ({ body }, res) => {
	const { email, password } = body

	if (!email || !password) {
		return res.status(400).json({ error: "Missing required fields" })
	}

	if (!isEmail(email)) {
		return res.status(400).json({ error: "Invalid email format" })
	}

	try {
		const user = await UserModel.findOne({ email })
		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" })
		}

		try {
			const passwordMatch = await compare(password, user.password)
			if (!passwordMatch) {
				return res.status(401).json({ error: "Invalid credentials" })
			}
		} catch (error) {
			console.error("Error comparing passwords:", error)
			return res.status(500).json({ error: "Internal server error" })
		}

		const token = sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1day" })

		return res.status(200).json({
			message: "Sign in successful",
			token,
			user: {
				username: user.username,
				email: user.email,
			},
		})
	} catch (error) {
		console.error("Error finding user:", error)
		return res.status(500).json({ error: "Internal server error" })
	}
})

$.post("/users/authorize", async ({ body }, res) => {
	const { fullName, email, password } = body

	if (!fullName || !email || !password) {
		return res.status(400).json({ error: "Missing required fields" })
	}

	if (!isEmail(email)) {
		return res.status(400).json({ error: "Invalid email format" })
	}

	if (!validatePasswordStrength(password)) {
		return res.status(400).json({ error: "Password must be strong" })
	}

	try {
		const existingUser = await UserModel.findOne({ email })
		if (existingUser) {
			return res.status(409).json({ error: "Email already exists" })
		}

		try {
			const newUser = new UserModel({
				fullName: sanitize(fullName),
				email: sanitize(email),
				password: await hash(password, parseInt(HASH_COMPLEXITY, 10)),
			})
			await newUser.save()

			const token = sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1day" })

			return res.status(201).json({
				message: "User created successfully",
				token,
			})
		} catch (error) {
			console.error("Error creating user:", error)
			return res.status(500).json({ error: "Internal server error" })
		}
	} catch (error) {
		console.error("Error checking for existing user:", error)
		return res.status(500).json({ error: "Internal server error" })
	}
})

$.get("/risks/:score", async ({ params }, rs) => {
	try {
		const risk = await RiskModel.findOne({ score: parseInt(params.score, 10) })

		if (!risk) {
			return rs.status(404).json({ error: "Data not found" })
		}

		rs.status(200).json(risk)
	} catch ({ message }) {
		console.error({ message })
		rs.status(500).json({ error: "Internal Server Error" })
	}
})

export default $
