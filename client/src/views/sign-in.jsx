import { SignIn as SignInIllustration } from "@app/assets/illustrations"
import { ReactComponent as Underline } from "@app/assets/underline.svg"
import { BlueBtn, GoBack } from "@app/components/common/button"
import Spinner from "@app/components/common/spinner"
import Wrapper from "@app/components/common/wrapper"
import { useNotify } from "@app/context/notify-context"
import { Color, useField, useSubmission } from "@app/hooks"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

const Header = styled.header`
	position: sticky;
	inset: 0 0 auto 0;
	background-image: linear-gradient(to bottom, var(--pry), transparent);
`

const HeaderContent = styled(Wrapper)`
	max-width: 1366px;
	padding-block: 22px;
`

const SignInWrapper = styled(Wrapper)`
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
	margin-bottom: 37.5%;
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
	justify-content: center;

	@media only screen and (min-width: 1024px) {
		margin-block: auto;
	}

	h2 {
		font-size: 2.5em;
		margin-bottom: 0.8em;
		position: relative;
		align-self: start;

		& > svg {
			position: absolute;
			inset: 100% 0 auto 0;
			transform: translateY(-112.5%);
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
		overflow: hidden;

		&::before,
		&::after {
			content: "";
			position: absolute;
			inset: calc(100% - 2px) 0 0 0;
			transition: transform 0.3s;
			background-color: hsla(0, 0%, 0%, 8%);
		}

		&::after {
			background-color: var(--sec);
			transform: translateX(calc(-100% - 1em));
		}

		&:has(input:focus),
		&:has(input:not(input[value=""])) {
			&::after {
				transform: translateX(0);
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

		& + p {
			font-size: 0.75em;

			a {
				color: var(--sec);
				margin-top: 2px;

				&:focus {
					text-decoration: none;
				}
			}
		}
	}
`

const SubmitBtn = styled(BlueBtn).attrs(() => ({ type: "submit" }))`
	display: grid;
	place-items: center;
	margin: auto;
	margin-top: 2em;
	width: 37.5%;
	min-width: 80px;
	max-width: 12ch;

	&[aria-disabled="true"] {
		opacity: 0.625;
	}
`

function SignIn() {
	const navigate = useNavigate()
	const email = useField("email")
	const password = useField("password")
	const { appendNotification } = useNotify()
	const [formData, setFormData] = React.useState({
		email: email.value,
		password: password.value,
	})
	const { handleSubmit, processing, data } = useSubmission("users/authenticate")

	React.useEffect(() => {
		setFormData({
			email: email.value,
			password: password.value,
		})
	}, [email.value, password.value])

	const handleSignIn = async (e) => {
		const fieldReset = { target: { value: "" } }

		try {
			await handleSubmit(e, formData)
			setTimeout(() => {
				if (data && data.message) {
					email.onChange(fieldReset)
					password.onChange(fieldReset)
					navigate("/", { replace: true })
				}
			}, 555)
		} catch (e) {
			const { error } = console
			if (e.response && e.response.data.error) {
				error("API error:", e.response.data.error)
				appendNotification({ type: Color.error, message: e.response.data.error })
			} else {
				error("Error:", e.message)
				appendNotification({ type: Color.error, message: "An error occurred." })
			}
		}
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
						<form onSubmit={handleSignIn}>
							<FieldWrapper>
								<label htmlFor="email">
									<input id="email" placeholder="email" {...email} />
									<span>email</span>
								</label>
							</FieldWrapper>
							<FieldWrapper>
								<label htmlFor="password">
									<input id="password" placeholder="password" {...password} />
									<span>password</span>
								</label>
								<p>
									Forgot your password? <Link to="/ForgotPassword">Reset it</Link>
								</p>
							</FieldWrapper>
							<SubmitBtn aria-disabled={processing}>{processing ? <Spinner /> : <span>Sign in</span>}</SubmitBtn>
						</form>
						<p>
							Don&apos;t have an account with us?&nbsp;
							<Link to="/SignUp" replace>
								Sign up
							</Link>
						</p>
					</FormContainer>
				</SignInWrapper>
			</section>
		</>
	)
}

export default SignIn
