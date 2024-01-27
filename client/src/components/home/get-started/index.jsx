import Wrapper from "@app/components/common/wrapper"
import React from "react"
import styled from "styled-components"
import RiskScoreSlider from "./score-slider"

const StyledWrapper = styled(Wrapper)`
	@media only screen and (min-width: 768px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 32px;
		margin-bottom: 6em;
	}

	@media only screen and (min-width: 1024px) {
		gap: 48px;
	}
`

const QuickDesc = styled.div`
	text-align: center;
	align-self: start;

	h2 {
		font-size: 2em;
		max-width: 320px;
		margin: 0 auto;

		@media only screen and (min-width: 625px) {
			max-width: none;
		}

		@media only screen and (min-width: 1024px) {
			max-width: 400px;
		}

		& + p {
			font-weight: lighter;
			margin: 0.625em auto 1.375em;

			@media only screen and (min-width: 1024px) {
				max-width: 718px;
			}

			span {
				color: var(--sec);
				font-weight: 600;
			}
		}
	}
`

function GetStarted() {
	return (
		<section id="get_started">
			<StyledWrapper>
				<QuickDesc>
					<h2>Smart investing tailored just for you</h2>
					<p>
						Forget investment stress. Answer a few questions, and AfroInvest builds your personalized portfolio of top
						Nigerian & global index funds. Grow your wealth steadily, hands-free, with smart tech doing the work.{" "}
						<span>#AfroInvest</span>
					</p>
				</QuickDesc>
				<RiskScoreSlider />
			</StyledWrapper>
		</section>
	)
}

export default GetStarted
