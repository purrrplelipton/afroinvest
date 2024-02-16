import { Eye, EyeClosed } from "@app/assets/icons"
import { SignUp as SignUpIllustration } from "@app/assets/illustrations"
import { ReactComponent as Underline } from "@app/assets/underline.svg"
import { BlueBtn, Btn, GoBack } from "@app/components/common/button"
import Spinner from "@app/components/common/spinner"
import StrengthMeter from "@app/components/common/strength-meter"
import Wrapper from "@app/components/common/wrapper"
import { useField, useResource } from "@app/hooks"
import React from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import styled from "styled-components"
import EmailConfirmation from "./email-confirmation"
import SignUpSuccessful from "./sign-up-successful"

const Header = styled.header`
	position: sticky;
	inset: 0 0 auto 0;
	background-image: linear-gradient(to bottom, var(--pry), transparent);
`

const HeaderContent = styled(Wrapper)`
	max-width: 1366px;
	padding-block: 22px;
`

const SignUpWrapper = styled(Wrapper)`
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
	height: 87.5vh;
	min-height: 625px;

	@media only screen and (min-width: 1024px) {
		flex-flow: row nowrap;

		& > * {
			flex-shrink: 0;
			width: 50%;
		}
	}

	& > svg {
		display: none;

		@media only screen and (min-width: 1024px) {
			display: initial;
		}
	}
`

const FormContainer = styled.div`
	margin-top: auto;
	margin-bottom: 25%;
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
	justify-content: center;

	@media only screen and (min-width: 1024px) {
		margin-block: auto;
	}

	h2 {
		font-size: 1.33333em;
		line-height: 1;
		margin-bottom: 0.8em;
		position: relative;
		align-self: start;

		& > svg {
			position: absolute;
			inset: 100% 0 auto 0;
			transform: translateY(-25%);
		}
	}

	form {
		position: relative;
		padding: 24px 0;
		margin-bottom: 32px;

		& + p {
			text-align: center;

			a {
				&:hover {
					background-color: hsla(0, 0%, 0%, 3%);
				}

				&:focus {
					text-decoration: none;
				}
			}
		}
	}
`

const FieldWrapper = styled.div`
	font-size: 1.25em;
	line-height: 1;
	display: flex;
	flex-flow: column nowrap;
	gap: 8px;
	align-items: stretch;
	position: relative;
	margin-bottom: 24px;

	&:last-of-type {
		margin-bottom: 40px;
	}

	label {
		--x-gap: 0.8em;
		--y-gap: 0.7em;
		display: flex;
		align-items: center;
		position: relative;

		&::before,
		&::after {
			content: "";
			position: absolute;
			inset: calc(100% - 2px) 0 0 0;
			transition: transform 0.3s;
			background-color: hsla(0, 0%, 0%, 8%);
		}

		&::after {
			left: 0;
			right: 100%;
			transition: right 0.3s;
			background-color: var(--sec);
		}

		&:has(input:focus),
		&:has(input:not(input[value=""])) {
			&::after {
				right: 0;
			}
		}

		input {
			width: 100%;
			padding-inline: var(--x-gap);
			padding-block: var(--y-gap);

			&::placeholder {
				color: inherit;
				opacity: 0;
			}

			&:has(~ button) {
				padding-right: 0;

				& ~ button {
					flex-shrink: 0;
					padding: 9px;
					display: grid;
					place-items: center;

					&:focus {
						outline-offset: -2px;
					}
				}
			}

			& ~ span {
				position: absolute;
				pointer-events: none;
				user-select: none;
				top: var(--y-gap);
				left: var(--x-gap);
				opacity: 0.66666;
				transition:
					opacity 0.2s,
					font-size 0.2s,
					top 0.2s,
					left 0.2s;
			}

			&:not([value=""]) {
				& ~ span {
					opacity: 0.33333;
					font-size: 0.75em;
					top: calc(0.125 * var(--y-gap));
					left: 0;
				}
			}
		}

		&[for="password"] + div {
			margin-top: 4px;
			font-size: 0.75em;
			position: absolute;
			inset: 100% 0 auto 0;
		}
	}
`

const SubmitBtn = styled(BlueBtn).attrs(() => ({ type: "submit" }))`
	display: grid;
	place-items: center;
	margin: auto;
	width: 37.5%;
	min-width: 80px;
	max-width: 12ch;

	&[aria-disabled="true"] {
		opacity: 0.625;
	}
`

const SignUpForm = () => {
	const navigate = useNavigate()
	const fullName = useField("text")
	const email = useField("email")
	const password = useField("password")
	const [passwordVisible, setPasswordVisible] = React.useState(false)
	const [formData, setFormData] = React.useState({
		fullName: fullName.value,
		email: email.value,
		password: password.value,
	})

	const [, services, processing] = useResource("users/authorize")

	React.useEffect(() => {
		setFormData({
			fullName: fullName.value,
			email: email.value,
			password: password.value,
		})
	}, [fullName.value, email.value, password.value])

	const handleSignUp = async (evt) => {
		evt.preventDefault()

		services.create(formData).then(() => {
			fullName.onChange({ target: { value: "" } })
			password.onChange({ target: { value: "" } })
			setTimeout(() => email.onChange({ target: { value: "" } }), 1111)
			navigate("Successful", {
				state: { email: formData.email },
				replace: true,
			})
		})
	}

	return (
		<>
			<Header>
				<HeaderContent>
					<GoBack aria-label="go back" />
				</HeaderContent>
			</Header>
			<section>
				<SignUpWrapper>
					<SignUpIllustration />
					<FormContainer>
						<h2>
							<span>Start your wealth creating journey!</span>
							<Underline />
						</h2>
						<form onSubmit={handleSignUp}>
							<FieldWrapper>
								<label htmlFor="fullName">
									<input id="fullName" {...fullName} placeholder="full name" />
									<span>full name</span>
								</label>
							</FieldWrapper>
							<FieldWrapper>
								<label htmlFor="email">
									<input id="email" {...email} placeholder="email" />
									<span>email</span>
								</label>
							</FieldWrapper>
							<FieldWrapper>
								<label htmlFor="password">
									<input
										id="password"
										{...password}
										type={passwordVisible ? "text" : password.type}
										placeholder="password"
									/>
									<span>password</span>
									<Btn
										onClick={() => setPasswordVisible((prv) => !prv)}
										aria-label={`${passwordVisible ? "hide" : "show"} password`}
									>
										{passwordVisible ? <EyeClosed /> : <Eye />}
									</Btn>
								</label>
								<StrengthMeter password={password.value} />
							</FieldWrapper>
							<SubmitBtn aria-disabled={processing}>{processing ? <Spinner /> : <span>Sign up</span>}</SubmitBtn>
						</form>
						<p>
							Already have an account?&nbsp;
							<Link to="/SignIn" replace>
								Sign in
							</Link>
						</p>
					</FormContainer>
				</SignUpWrapper>
			</section>
		</>
	)
}

function SignUp() {
	return (
		<Routes>
			<Route index element={<SignUpForm />} />
			<Route path="Successful" element={<SignUpSuccessful />} />
			<Route path="EmailConfirmation/:token" element={<EmailConfirmation />} />
		</Routes>
	)
}

export default SignUp
