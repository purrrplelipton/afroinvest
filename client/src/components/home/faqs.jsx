import { ChevronDown } from "@app/assets/icons"
import Wrapper from "@app/components/common/wrapper"
import React from "react"
import styled from "styled-components"

const StyledWrapper = styled(Wrapper)`
	padding-top: 4em;
	margin-bottom: 6em;

	h2 {
		font-size: 2em;
		text-align: center;
	}
`

const AccordionSection = styled.div`
	display: grid;
	gap: 16px;
	margin-top: 2em;

	@media only screen and (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media only screen and (min-width: 1366px) {
		grid-template-columns: repeat(3, 1fr);
	}

	& > div {
		display: grid;
		grid-template-columns: repeat(12, 1fr);

		&:has(:checked) h3 {
			margin-bottom: 0.875em;

			&::before {
				content: "";
			}
		}

		h3 {
			font-size: 1.125em;
			align-self: start;
			grid-column: span 11;
			transition: margin-bottom 0.25s ease-in-out;
			position: relative;

			&::before {
				position: absolute;
				z-index: -1;
				inset: 50% auto auto 50%;
				width: 112.5%;
				height: 112.5%;
				transform: translate(-50%, -50%);
				background-color: var(--sec);
				opacity: 5%;
				border-radius: 10px;
			}

			&:has(+ label:has(:checked)) {
			}

			& + label {
				align-self: start;
				aspect-ratio: 1 / 1;
				display: grid;
				place-items: center;
				position: relative;

				&::before {
					position: absolute;
					inset: 0;
					border-radius: 999px;
					background-color: var(--sec);
					opacity: 10%;
				}

				&:focus-within::before {
					content: "";
				}

				input {
					position: absolute;
					width: 1px;
					height: 1px;
					padding: 0;
					margin: -1px;
					overflow: hidden;
					clip: rect(0, 0, 0, 0);
					white-space: nowrap;
					border-width: 0;

					& + svg {
						transition: 0.2s ease-in-out;
					}

					&:checked + svg {
						transform: rotate(-0.5turn);
					}
				}

				& + div {
					grid-column: span 12;
				}
			}

			& + label:has(:checked) {
				& + div {
					max-height: 180px;
				}
			}
		}

		div {
			transition: max-height 0.25s ease-in-out;
			max-height: 0;
			overflow: hidden;

			p {
				font-weight: lighter;
			}
		}
	}
`

function FAQs() {
	return (
		<section id="faqs">
			<StyledWrapper>
				<h2>FAQs</h2>
				<AccordionSection>
					<div>
						<h3>What is AfroInvest and how does it work?</h3>
						<label htmlFor="faq_1">
							<input type="checkbox" id="faq_1" />
							<ChevronDown />
						</label>
						<div>
							<p>
								AfroInvest is a robo-advisor platform that utilizes advanced algorithms to create and manage diversified
								investment portfolios for users. It assesses individual risk tolerance, financial goals, and market
								conditions to provide personalized investment strategies.
							</p>
						</div>
					</div>
					<div>
						<h3>What types of investment portfolios does AfroInvest offer?</h3>
						<label htmlFor="faq_2">
							<input type="checkbox" id="faq_2" />
							<ChevronDown />
						</label>
						<div>
							<p>
								AfroInvest offers a range of diversified portfolios, including conservative, balanced, and
								growth-oriented options. Each portfolio is designed to align with different risk tolerances and
								investment objectives.
							</p>
						</div>
					</div>
					<div>
						<h3>How often does AfroInvest rebalance portfolios?</h3>
						<label htmlFor="faq_3">
							<input type="checkbox" id="faq_3" />
							<ChevronDown />
						</label>
						<div>
							<p>
								AfroInvest monitors portfolios regularly and rebalances them when needed to maintain the desired asset
								allocation. The frequency of rebalancing depends on market conditions and changes in your personal
								circumstances.
							</p>
						</div>
					</div>
					<div>
						<h3>Is AfroInvest suitable for beginners in investing?</h3>
						<label htmlFor="faq_4">
							<input type="checkbox" id="faq_4" />
							<ChevronDown />
						</label>
						<div>
							<p>
								Yes, AfroInvest is designed to be user-friendly and suitable for individuals at all levels of investing
								experience. Our platform provides educational resources to help beginners understand and navigate the
								world of investing.
							</p>
						</div>
					</div>
					<div>
						<h3>Does AfroInvest provide tax-related information for my investments?</h3>
						<label htmlFor="faq_5">
							<input type="checkbox" id="faq_5" />
							<ChevronDown />
						</label>
						<div>
							<p>
								While AfroInvest does not provide tax advice, we offer access to essential investment-related documents,
								such as annual statements, which can be used for tax reporting purposes.
							</p>
						</div>
					</div>
					<div>
						<h3>How does AfroInvest take economic conditions into account when managing portfolios?</h3>
						<label htmlFor="faq_6">
							<input type="checkbox" id="faq_6" />
							<ChevronDown />
						</label>
						<div>
							<p>
								AfroInvest&apos;s algorithm considers current economic conditions and market trends when managing
								portfolios. This allows for dynamic adjustments to investment strategies, aiming to optimize returns
								based on prevailing economic factors.
							</p>
						</div>
					</div>
				</AccordionSection>
			</StyledWrapper>
		</section>
	)
}

export default FAQs
