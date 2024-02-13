import { compare, hash } from "bcrypt"
import { Router } from "express"
import jsonwebtoken from "jsonwebtoken"
import sanitize from "sanitize-html"
import validator from "validator"
import { RiskModel, UserModel } from "../models/index.js"
import { AUTH_USER, EMAIL_SECRET, HASH_COMPLEXITY, PASSWORD_SECRET } from "../utils/config.js"
import { transporter } from "../utils/middleware.js"

const { sign, verify } = jsonwebtoken
const { isEmail } = validator

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

		const firstNameMatch = user.fullName.match(/^(.*?)\s+/)
		const firstName = firstNameMatch ? firstNameMatch[1] : user.fullName

		try {
			const passwordMatch = await compare(password, user.password)
			if (!passwordMatch) {
				return res.status(401).json({ error: "Invalid credentials" })
			}

			if (!user.confirmed) {
				return res
					.status(401)
					.json({ error: `Hold on a sec, ${firstName}! Seems you haven't confirmed your email yet.` })
			}

			const token = sign({ userId: user._id }, PASSWORD_SECRET, { expiresIn: "1d" })

			return res.status(200).json({
				message: `Welcome back, ${firstName}!`,
				token,
			})
		} catch (error) {
			console.error("Error comparing passwords:", error)
			return res.status(500).json({ error: "Internal server error" })
		}
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

			const firstNameMatch = newUser.fullName.match(/^(.*?)\s+/)
			const firstName = firstNameMatch ? firstNameMatch[1] : newUser.fullName

			await newUser.save()

			const token = sign({ id: newUser._id }, EMAIL_SECRET, { expiresIn: "1d" })

			try {
				await transporter.sendMail({
					from: `AfroInvest <${AUTH_USER}>`,
					to: newUser.email,
					subject: "Account Confirmation for AfroInvest",
					html: `
						<h1>Hi, ${firstName}!</h1>
						<p>Welcome to AfroInvest! Please confirm your email address to activate your account and unlock full access.</p>
						<p>Click the link below to confirm your email:</p>
						<a href="https://afroinvest.onrender.com/SignUp/EmailConfirmation/${token}">confirm Email</a>
						<p>This link will expire in 24 hours.</p>
						<p>Thanks,</p>
						<p>The AfroInvest Team</p>`,
				})

				return res.status(201).json({ message: `Welcome, ${firstName}! Check your email for confirmation.` })
			} catch (error) {
				console.error(`Error sending verification email to ${email}:`, error)
				return res.status(500).json({
					error: "There was an error sending your confirmation email. Please try again later.",
				})
			}
		} catch (error) {
			console.error("Error creating user:", error)
			return res.status(500).json({
				error: "There was an error creating your account. Please contact support.",
			})
		}
	} catch (error) {
		console.error("Error checking for existing user:", error)
		return res.status(500).json({ error: "Internal server error" })
	}
})

$.get("/risks/:score", async ({ params }, res) => {
	try {
		const risk = await RiskModel.findOne({ score: parseInt(params.score, 10) })

		if (!risk) {
			return res.status(404).json({ error: "Data not found" })
		}

		res.status(200).json(risk)
	} catch ({ message }) {
		console.error({ message })
		res.status(500).json({ error: "Internal Server Error" })
	}
})

$.get("/confirm/:token", async ({ params }, res) => {
	if (!params.token) {
		return res.status(400).json({ error: "Invalid confirmation link" })
	}

	try {
		const { id } = verify(params.token, EMAIL_SECRET)

		if (id) {
			await UserModel.findByIdAndUpdate(id, { confirmed: true })

			return res.status(200).json({ message: "Email confirmation successful" })
		} else {
			return res.status(400).json({ error: "Invalid token" })
		}
	} catch (error) {
		console.error("Error confirming user:", error)
		return res.status(500).json({ error: "Internal server error" })
	}
})

$.post("/resend/confirmation", async ({ body }, res) => {
	try {
		const user = await UserModel.findOne({ email: body.email })
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		if (user.confirmed) {
			return res.status(400).json({ error: "Account already confirmed" })
		}

		const firstNameMatch = user.fullName.match(/^(.*?)\s+/)
		const firstName = firstNameMatch ? firstNameMatch[1] : user.fullName

		const token = sign({ id: user._id }, EMAIL_SECRET, { expiresIn: "1d" })

		await transporter.sendMail({
			from: `AfroInvest ${AUTH_USER}`,
			to: user.email,
			subject: "Account Confirmation for AfroInvest",
			html: `
				<h1>Hi, ${firstName}!</h1>
				<p>Welcome to AfroInvest! Please confirm your email address to activate your account and unlock full access.</p>
				<p>Click the link below to confirm your email:</p>
				<a href="https://afroinvest.onrender.com/SignUp/EmailConfirmation/${token}">confirm Email</a>
				<p>This link will expire in 24 hours.</p>
				<p>Thanks,</p>
				<p>The AfroInvest Team</p>`,
		})

		res.status(200).json({ message: "Confirmation email resent successfully" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Something went wrong, please try again later" })
	}
})
export default $
