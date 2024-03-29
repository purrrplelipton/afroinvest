import { InvestingAmico } from "@app/assets/illustrations"
import { GetStarted } from "@app/components/common/button"
import Wrapper from "@app/components/common/wrapper"
import React from "react"
import styled from "styled-components"

const Landing = styled(Wrapper)`
	height: 93.75vh;
	min-height: 625px;
	display: grid;
	align-items: center;

	@media only screen and (min-width: 1024px) {
		grid-template-columns: 1fr 1fr;
	}

	div {
		margin: auto 0 8em;

		@media only screen and (min-width: 1024px) {
			max-width: 545px;
			margin: 4em 0 0;
		}

		& + svg {
			display: none;

			@media only screen and (min-width: 1024px) {
				display: initial;
			}
		}
	}
`

const MainHeading = styled.h1`
	font-size: 2.25em;
	line-height: 1.125;
	margin-bottom: 0.25em;
`

const SubHeading = styled.p`
	font-weight: lighter;
	margin-bottom: 2em;

	@media only screen and (min-width: 1024px) {
		max-width: 65%;
	}
`

function Banner() {
	return (
		<section id="home">
			<Landing>
				<div>
					<MainHeading>A smarter way to invest and save for the future</MainHeading>
					<SubHeading>Make your money work for you by investing in personalized long term portfolios</SubHeading>
					<GetStarted />
				</div>
				<InvestingAmico />
			</Landing>
		</section>
	)
}

export default Banner
