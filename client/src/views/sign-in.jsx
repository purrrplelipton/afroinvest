import { Eye, EyeClosed } from "@app/assets/icons"
import { SignIn as SignInIllustration } from "@app/assets/illustrations"
import { ReactComponent as Loader } from "@app/assets/loader.svg"
import { ReactComponent as Underline } from "@app/assets/underline.svg"
import { BlueBtn, Btn, GoBack } from "@app/components/common/button"
import Wrapper from "@app/components/common/wrapper"
import { spinKeyframe } from "@app/components/home/get-started/score-slider"
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useField, useSubmission } from "../hooks"

const Header = styled.header`
	position: sticky;
	inset: 0 0 auto 0;
	background-image: linear-gradient(to bottom, var(--pry), transparent);
`

const HeaderContent = styled(Wrapper)`
	max-width: 1366px;
	padding-block: 20px;

	& > button {
		margin-block: 13px;
	}
`

const SignInWrapper = styled(Wrapper)`
	display: grid;
	align-items: center;
	height: 87.5vh;
	min-height: 625px;

	@media only screen and (min-width: 1024px) {
		grid-template-columns: 1fr 1fr;
	}

	& > svg {
		display: none;

		@media only screen and (min-width: 1024px) {
			display: initial;
		}
	}
`

const FormContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
	justify-content: center;

	h2 {
		font-size: 2.5em;
		margin-bottom: 0.8em;
		position: relative;
		align-self: start;

		& > svg {
			position: absolute;
			inset: auto 0 0 0;
		}
	}

	form {
		background-color: hsla(0, 0%, 0%, 3%);
		padding: 20px;
		border-radius: 10px;
	}
`

const FieldWrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
	gap: 0.5em;
	align-items: stretch;
	position: relative;

	&:not(:last-of-type) {
		margin-bottom: 0.875em;
	}

	label {
		background-color: var(--pry);
		display: flex;
		align-items: center;
		border-radius: 8px;
		overflow: hidden;

		input {
			font-size: 1.25em;
			line-height: 1;
			width: 100%;
			padding: 0.6em 0.75em;

			&:has(+ button) {
				padding-right: 0;

				& + button {
					flex-shrink: 0;
					padding: 9px;

					&:focus {
						border-radius: inherit;
						outline-offset: -3px;
					}
				}
			}
		}

		& + span {
			position: absolute;
			align-self: end;
			inset: calc(100%) auto auto auto;
			line-height: 1;
			font-size: 0.75em;
			margin-top: 2px;
			color: red;
		}
	}

	& + div:not([class]) {
		display: flex;
		align-items: center;
		justify-content: end;

		a {
			font-size: 0.875em;
			line-height: 1;
			color: var(--sec);
			margin-top: 8px;

			&:focus {
				text-decoration: none;
			}
		}
	}
`

const SubmitBtn = styled(BlueBtn).attrs(({ $type = "submit" }) => ({ type: $type }))`
	display: grid;
	place-items: center;
	margin-inline: auto;
	margin-top: 2em;
	width: 37.5%;
	min-width: 80px;

	&[aria-disabled="true"] {
		opacity: 0.625;
	}

	&:has(i):has(svg) {
		svg {
			position: absolute;
			animation: ${spinKeyframe} 0.8s linear infinite;
		}

		i {
			all: unset;
			display: block;
			height: calc(1em * 1.125);
		}
	}
`

function SignIn() {
	const email = useField("email")
	const password = useField("password")
	const [passwordVisible, setPasswordVisible] = React.useState(false)
	const [formData, setFormData] = React.useState({
		email: email.value,
		password: password.value,
	})
	const [canSubmit, setCanSubmit] = React.useState(false)
	const { handleSubmit, isLoading } = useSubmission("users/auth")

	React.useEffect(() => {
		setFormData({
			email: email.value,
			password: password.value,
		})
		setCanSubmit([!email.error, !password.error].every((v) => Boolean(v)))
	}, [email.value, password.value])

	const onSubmit = async (e) => {
		if (!canSubmit || isLoading) return
		await handleSubmit(e, formData)
	}

	return (
		<>
			<Header>
				<HeaderContent>
					<GoBack aria-label="go back" />
				</HeaderContent>
			</Header>
			<section>
				<SignInWrapper>
					<SignInIllustration />
					<FormContainer>
						<h2>
							<span>Welcome back!</span>
							<Underline />
						</h2>
						<form onSubmit={onSubmit}>
							<FieldWrapper>
								<label htmlFor="user_email">
									<input
										id="user_email"
										type={email.type}
										value={email.value}
										onChange={email.onChange}
										onBlur={email.onBlur}
										placeholder="email"
									/>
								</label>
								{email.error && email.touched && <span>{email.error}</span>}
							</FieldWrapper>
							<FieldWrapper>
								<label htmlFor="user_password">
									<input
										id="user_password"
										type={passwordVisible ? "text" : password.type}
										value={password.value}
										onChange={password.onChange}
										onBlur={password.onBlur}
										placeholder="password"
									/>
									<Btn
										onClick={() => setPasswordVisible((prv) => !prv)}
										aria-label={`${passwordVisible ? "show" : "hide"} password`}
									>
										{passwordVisible ? <Eye /> : <EyeClosed />}
									</Btn>
								</label>
								{password.error && password.touched && <span>{password.error}</span>}
							</FieldWrapper>
							<div>
								<Link to="/forgotPassword">Forgot password?</Link>
							</div>
							<SubmitBtn aria-disabled={!canSubmit || isLoading}>
								{!isLoading && <span>Sign in</span>}
								{isLoading && <i />}
								{isLoading && <Loader />}
							</SubmitBtn>
						</form>
						<p>
							Don&apos;t have an account with us? <Link to="signUp">Sign up</Link>
						</p>
					</FormContainer>
				</SignInWrapper>
			</section>
		</>
	)
}

export default SignIn
