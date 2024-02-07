import { Eye, EyeClosed, Point } from "@app/assets/icons"
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

					&:focus {
						outline-offset: -2px;
					}
				}
			}

			& ~ i {
				all: unset;
				position: absolute;
				overflow: hidden;
				inset: calc(100% - 2px) 0 0 0;
				background-color: hsla(0, 0%, 0%, 20%);

				&::before {
					content: "";
					position: absolute;
					inset: 0;
					background-color: var(--sec);
					transform: translateX(calc(-100% - 1em));
					transition: transform 0.3s ease-in-out;
				}
			}

			&:focus,
			&:not([value=""]) {
				& ~ i::before {
					transform: translateX(0);
				}
			}

			& ~ span {
				position: absolute;
				pointer-events: none;
				user-select: none;
				top: var(--y-gap);
				left: var(--x-gap);
				opacity: 0.99999;
				transition:
					opacity 0.2s ease-in-out,
					font-size 0.2s ease-in-out,
					top 0.2s ease-in-out,
					left 0.2s ease-in-out;
			}

			&:not([value=""]) {
				& ~ span {
					opacity: 0.66666;
					font-size: 0.75em;
					top: calc(0.125 * var(--y-gap));
					left: 0;
				}
			}
		}
	}

	&[data-for="password"] {
		margin-bottom: 3em;

		& + div {
			font-size: 0.875em;
			line-height: 1.125;

			p {
				font-weight: lighter;
				margin-bottom: 0.25em;

				span {
					font-weight: 600;
				}
			}
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
									<input id="fullName" {...fullName} placeholder="full name" />
									<span>full name</span>
									<i />
								</label>
							</FieldWrapper>
							<FieldWrapper>
								<label htmlFor="email">
									<input id="email" {...email} placeholder="email" />
									<span>email</span>
									<i />
								</label>
							</FieldWrapper>
							<div>
								<FieldWrapper data-for="password">
									<label htmlFor="password">
										<input
											id="password"
											{...password}
											type={passwordVisible ? "text" : password.type}
											placeholder="password"
										/>
										<span>password</span>
										<i />
										<Btn
											onClick={() => setPasswordVisible((prv) => !prv)}
											aria-label={`${passwordVisible ? "hide" : "show"} password`}
										>
											{passwordVisible ? <Eye /> : <EyeClosed />}
										</Btn>
									</label>
								</FieldWrapper>
								<div hidden>
									<p>
										<span>Be long:</span> Ensure passwords are a minimum of 12 characters in length, with 14 characters
										or more being preferable.
									</p>
									<p>
										<span>Be strong:</span> Craft robust passwords with a blend of uppercase and lowercase letters,
										numbers, and symbols. Avoid strings, repetitions, dictionary words, or names of people, characters,
										products, or organizations.
									</p>
									<p>
										<span>Be random:</span> Craft secure passwords with random elements like mixed-case letters,
										numbers, symbols, or opt for a 5-7 word passphrase.
									</p>
									<p>
										<span>Be unique:</span> Passwords should be used for one and only one account.
									</p>
								</div>
							</div>
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
