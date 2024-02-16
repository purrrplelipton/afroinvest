import { MailSent } from "@app/assets/illustrations"
import { BlueBtn } from "@app/components/common/button"
import Logo from "@app/components/common/logo"
import Spinner from "@app/components/common/spinner"
import Wrapper from "@app/components/common/wrapper"
import { useResource } from "@app/hooks"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

const Header = styled.header`
	position: fixed;
	inset: 0 0 auto 0;
`

const ModdedWrapper = styled(Wrapper)`
	max-width: 1366px;
	padding-block: 16px;
`

const Container = styled(Wrapper)`
	margin-top: 72px;
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
	justify-content: center;
	height: 88vh;
	min-height: 720px;

	& > svg {
		margin-top: 32px;

		& + div {
			margin-bottom: auto;
			text-align: center;

			h1 {
				font-size: 1.5em;
				font-weight: 400;
			}

			p {
				max-width: 400px;
				margin-inline: auto;
				line-height: 1.25;

				& + div {
					p {
						margin-block: 24px 10px;
						text-decoration: underline;
						font-weight: 900;

						& + button {
							min-width: 12ch;
						}
					}
				}
			}
		}
	}

	@media only screen and (min-width: 768px) {
		flex-flow: row nowrap;
		align-items: center;
		gap: 12px;

		& > svg {
			width: 50%;
			flex-shrink: 0;
			margin: 0;

			& + div {
				width: 50%;
				flex-shrink: 0;
				margin: 0;
			}
		}

		@media only screen and (min-width: 1024px) {
			gap: 24px;
		}
	}
`

function SignUpSuccessful() {
	const location = useLocation()
	const [, services, processing] = useResource("resend/confirmation")

	// React.useEffect(() => {
	// 	let isInitialLoad = true

	// 	return () => {
	// 		if (isInitialLoad) return (isInitialLoad = false)

	// 		const updatedState = {}
	// 		const stateKeys = Object.keys(location.state)
	// 		stateKeys.forEach((key) => {
	// 			if (key !== "email") return (updatedState[key] = location.state[key])
	// 		})

	// 		location.state = updatedState
	// 	}
	// }, [location.state])

	return (
		<>
			<Header>
				<ModdedWrapper>
					<Link to="/" replace>
						<Logo />
					</Link>
				</ModdedWrapper>
			</Header>
			<section>
				<Container>
					<MailSent />
					<div>
						<h1>Great!</h1>
						<div>
							<p>You&apos;re all set! Check your email and confirm to get started.</p>
							<div>
								<p>Didn&apos;t get the email?</p>
								<BlueBtn
									onClick={() => {
										const { email } = location.state || {}
										services.create({ email })
									}}
								>
									{processing ? <Spinner /> : <span>Resend Confirmation Email</span>}
								</BlueBtn>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}

export default SignUpSuccessful
