import nodemailer from "nodemailer"
import { AUTH_PASS, AUTH_USER } from "./config.js"

const { createTransport } = nodemailer

export const transporter = createTransport({
	service: "hotmail",
	host: "smtp-mail.hotmail.com",
	secure: false,
	port: 587,
	auth: {
		user: AUTH_USER,
		pass: AUTH_PASS,
	},
	tls: {
		ciphers: "SSLv3",
	},
})

export const UnknownEndpoint = (_, res) => {
	res.status(404).send({ error: "unknown endpoint" })
}

export const ErrorHandler = (error, _, res, next) => {
	console.error(error.message)

	if (error.name === "CastError") {
		return res.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message })
	} else if (error.name === "JsonWebTokenError") {
		return res.status(400).json({ error: "token missing or invalid" })
	}

	next(error)
}
