import { Celebration } from "@app/assets/illustrations"
import { SignIn } from "@app/components/common/button"
import Logo from "@app/components/common/logo"
import Wrapper from "@app/components/common/wrapper"
import Fallback from "@app/components/fallback"
import { useResource } from "@app/hooks"
import React from "react"
import { Link, useParams } from "react-router-dom"
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
	margin-top: 48px;
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
	justify-content: center;
	height: 93.75vh;
	min-height: 625px;

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

				& + button {
					margin-top: 32px;
				}
			}
		}
	}

	@media only screen and (min-width: 768px) {
		flex-flow: row-reverse nowrap;
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

function EmailConfirmation() {
	const { token } = useParams()

	const [resource, , processing] = useResource(`/confirm/${token}`)

	return (
		<>
			<Header>
				<ModdedWrapper>
					<Link to="/" replace>
						<Logo />
					</Link>
				</ModdedWrapper>
			</Header>
			{token && !resource && processing && <Fallback />}
			{token && resource && !processing && (
				<section>
					<Container>
						<Celebration />
						<div>
							<h1>Congratulations!</h1>
							<div>
								<p>You have confirmed your email successfully and now ready to sign in to your account.</p>
								<SignIn $replace />
							</div>
						</div>
					</Container>
				</section>
			)}
		</>
	)
}

export default EmailConfirmation
