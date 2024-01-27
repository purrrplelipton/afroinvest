import { Eye, EyeClosed } from "@app/assets/icons"
import { SignIn as SignInIllustration } from "@app/assets/illustrations"
import { BlueBtn, Btn, GoBack } from "@app/components/common/button"
import Wrapper from "@app/components/common/wrapper"
import { useField } from "@app/hooks"
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

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
	}

	form {
		background-color: hsla(0, 0%, 0%, 5%);
		padding: 20px;
		border-radius: 10px;



		& >
	}
`

const FieldWrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
	gap: 0.5em;
	align-items: stretch;

	&:not(:last-of-type) {
		margin-bottom: 0.75em;
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
						border-top-left-radius: 0;
						border-top-right-radius: inherit;
						border-bottom-right-radius: inherit;
						border-bottom-left-radius: 0;
						outline-offset: -3px;
					}
				}
			}
		}
	}

	&:has(> a) a {
		font-size: 0.875em;
		line-height: 1;
		color: var(--sec);
		align-self: end;

		&:focus {
			text-decoration: none;
		}
	}
`

const SubmitBtn = styled(BlueBtn).attrs(({ $type = "submit" }) => ({ type: $type }))`
	display: block;
	margin-inline: auto;
	margin-top: 2em;
`

function SignIn() {
	const email = useField("email")
	const password = useField("password")
	const [passwordVisible, setPasswordVisible] = React.useState(false)
	const [formData, setFormData] = React.useState({
		email: email.value,
		password: password.value,
	})

	React.useEffect(() => {
		setFormData({
			email: email.value,
			password: password.value,
		})
	}, [email.value, password.value])

	const handleSubmit = async (e) => {
		try {
			e.preventDefault()
			console.log(formData)
			email.onChange({ value: "" })
			password.onChange({ value: "" })
			setFormData({ email: "", password: "" })
		} catch ({ message }) {
			console.error(message)
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
						<h2>Welcome back!</h2>
						<form onSubmit={handleSubmit}>
							<FieldWrapper>
								<label htmlFor="email">
									<input placeholder="email" {...email} />
								</label>
							</FieldWrapper>
							<FieldWrapper>
								<label htmlFor="pswrd">
									<input placeholder="password" {...password} type={passwordVisible ? "text" : "password"} />
									<Btn
										onClick={() => setPasswordVisible((prv) => !prv)}
										aria-label={`${passwordVisible ? "show" : "hide"} password`}
									>
										{passwordVisible ? <Eye /> : <EyeClosed />}
									</Btn>
								</label>
								<Link to="/forgotPassword">Forgot password?</Link>
							</FieldWrapper>
							<SubmitBtn type="submit">
								<span>Sign in</span>
							</SubmitBtn>
						</form>
					</FormContainer>
				</SignInWrapper>
			</section>
		</>
	)
}

export default SignIn
