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

export function ConfirmationEmailTemplate(name, email, token) {
	return `
				<header style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;position: fixed;inset: 0 0 auto 0;background-image: linear-gradient(to bottom, #fff, transparent);">
					<div style="width: 87.5%;margin: auto;max-width: 1280px;padding: 20px 0;">
						<a
							href="https://afroinvest.onrender.com/"
							target="_blank"
							rel="noopener noreferrer"
							style="color: inherit;text-decoration: none;"
							>
								<span style="font-size: 2.5em;height: 0.800375em;line-height: 1;font-weight: 900;">Ai</span>
						</a>
					</div>
				</header>
				<div role="main" style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
					<div style="width: 87.5%;min-width: 375px;max-width: 625px;margin: 2em auto 6em;padding: 20px 14px;text-align: center;">
						<h1>Hi, ${name}!</h1>
						<p style="width: 75%;margin: auto;">
							Please confirm that your email address is&nbsp;
								<a
									href="mailto:${email}"
									style="text-decoration: none;color: hsl(208, 100%, 22%);font-weight: bolder;"
								>
									<span style="display: inline-block;margin: 0 0 0.1em;">${email}</span>
								</a>&nbsp;
							and that you entered it when signing up for AfroInvest.
						</p>
						<a
							href="https://afroinvest.onrender.com/SignUp/EmailConfirmation/${token}"
							target="_blank"
							rel="noopener noreferrer"
							style="color: #fff;text-decoration: none;background-color: hsl(208, 100%, 22%);border-radius: 10px;padding: 0.75em 1em 0.625em;display: inline-block;margin: 24px 0 10px;"
							>
								<span>Confirm Email</span>
						</a>
						<div>
							<p style="margin: 0;">Let's begin your wealth creation,</p>
							<p style="margin: 0;">The AfroInvest Team</p>
						</div>
					</div>
					<div style="display: flex;align-items: center;justify-content: center;">
						<a
							href="https://afroinvest.onrender.com/"
							style="text-decoration: none;color: inherit;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;margin-left: auto;"
							>
							<div style="color: #fff;background-color: hsl(208, 100%, 22%);border-radius: 999px;display: grid;place-items: center;">
								<svg style="display: block;vertical-align: middle;margin: 8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
							</div>
							<span style="display: block;margin: 0 auto;">More about</span>
							<span style="text-decoration: underline;display: block;margin: 0 auto;">AfroInvest</span>
						</a>
						<a
							href="https://afroinvest.onrender.com/#faqs"
							style="text-decoration: none;color: inherit;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;margin: 0 1em;"
							>
							<div style="color: #fff;background-color: hsl(208, 100%, 22%);border-radius: 999px;display: grid;place-items: center;">
								<svg style="display: block;vertical-align: middle;margin: 8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" /><path d="M12 19l0 .01" /></svg>
							</div>
							<span style="display: block;margin: 0 auto;">Questions?</span>
							<span style="text-decoration: underline;display: block;margin: 0 auto;">We're here</span>
						</a>
						<a
							href="https://x.com/afroinvest"
							style="text-decoration: none;color: inherit;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;margin-right: auto;"
							>
							<div style="color: #fff;background-color: hsl(208, 100%, 22%);border-radius: 999px;display: grid;place-items: center;">
								<svg style="display: block;vertical-align: middle;margin: 8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
							</div>
							<span style="display: block;margin: 0 auto;">Join the community</span>
							<span style="text-decoration: underline;display: block;margin: 0 auto;">on 𝕏</span>
						</a>
					</div>
					<div style="font-weight: lighter;font-size: 0.875em;width: 87.5%;margin: auto;">
						<p style="text-align: center;">
							If it wasn't you who submitted the email address in the first place, well then that's messed up and we're sorry. Simply ignore this email and don't click the confirmation link above. You will not receive any emails from us.
						</p>
					</div>
				</div>
			`
}
