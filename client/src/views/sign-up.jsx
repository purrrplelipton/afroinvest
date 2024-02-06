import { Eye, EyeClosed } from "@app/assets/icons"
import { SignUp as SignUpIllustration } from "@app/assets/illustrations"
import { ReactComponent as Underline } from "@app/assets/underline.svg"
import { BlueBtn, Btn, GoBack } from "@app/components/common/button"
import Spinner from "@app/components/common/spinner"
import Wrapper from "@app/components/common/wrapper"
import { useField, useSubmission } from "@app/hooks"
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

const SignUpWrapper = styled(Wrapper)`
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
		line-height: 1;
		margin-bottom: 0.8em;
		position: relative;
		align-self: start;

		& > svg {
			position: absolute;
			inset: 100% 0 auto 0;
			/* transform: translateY(-37.5%); */
		}
	}

	form {
		background-color: hsla(0, 0%, 0%, 3%);
		padding: 20px;
		border-radius: 10px;

		& + p {
			margin-top: 1em;
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
	display: flex;
	flex-flow: column nowrap;
	gap: 0.5em;
	align-items: stretch;
	position: relative;

	&:not(:last-of-type) {
		margin-bottom: 1.375em;
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
			margin-top: 4px;
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
			margin-top: 2px;

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
`

function SignUp() {
	const fullName = useField("text")
	const email = useField("email")
	const password = useField("password")
	const [passwordVisible, setPasswordVisible] = React.useState(false)
	const [formData, setFormData] = React.useState({
		fullName: fullName.value,
		email: email.value,
		password: password.value,
	})
	const { handleSubmit, ...rest } = useSubmission("users/authorize")

	React.useEffect(() => {
		setFormData({
			fullName: fullName.value,
			email: email.value,
			password: password.value,
		})
	}, [fullName.value, email.value, password.value])

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
						<form onSubmit={async (e) => await handleSubmit(e, formData)}>
							<FieldWrapper>
								<label htmlFor="fullName">
									<input
										id="fullName"
										type={fullName.type}
										value={fullName.value}
										onChange={fullName.onChange}
										onBlur={fullName.onBlur}
										placeholder="full name"
										autoComplete="off"
									/>
								</label>
								{fullName.error && fullName.touched && <span>{fullName.error}</span>}
							</FieldWrapper>
							<FieldWrapper>
								<label htmlFor="email">
									<input
										id="email"
										type={email.type}
										value={email.value}
										onChange={email.onChange}
										onBlur={email.onBlur}
										placeholder="email"
										autoComplete="off"
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
							<SubmitBtn aria-disabled={rest.processing}>
								{rest.processing ? <Spinner /> : <span>Sign up</span>}
							</SubmitBtn>
						</form>
						<p>
							Already have an account? <Link to="/signin">Sign in</Link>
						</p>
					</FormContainer>
				</SignUpWrapper>
			</section>
		</>
	)
}

export default SignUp
