import { ReactComponent as Underline } from "@app/assets/underline.svg"
import Wrapper from "@app/components/common/wrapper"
import React from "react"
import styled from "styled-components"
import { v4 as uuidv4 } from "uuid"

const SectionDesc = styled.div`
	text-align: center;
	max-width: 475px;
	margin: 0 auto;

	@media only screen and (min-width: 1024px) {
		max-width: 580px;
	}

	h2 {
		font-size: 2em;
	}

	p {
		font-weight: lighter;
		margin: 0.625em 0 1.375em;
	}
`

const TabSelectorDiv = styled.div`
	font-size: 1.125em;
	display: flex;
	flex-flow: row nowrap;
	gap: 0.5em;
	align-items: center;
	justify-content: center;
	overflow: auto;
	position: relative;
	scroll-behavior: smooth;
	margin: 0 auto 2em;

	label {
		flex-shrink: 0;
		position: relative;
		overflow: hidden;

		&::before {
			position: absolute;
			inset: 0;
			background-color: var(--sec);
			border-radius: 8px;
			opacity: 3%;
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
		}

		input:checked + span {
			color: var(--sec);
			position: relative;

			&::after {
				content: "";
				position: absolute;
				inset: calc(100% - 4px) 0 3px 0;
				background-color: currentColor;
			}
		}

		span {
			display: inline-block;
			color: hsl(0, 0%, 75%);
			line-height: 1;
			margin: 0.25em 0.4em;
		}
	}
`

const Tab = styled.div`
	padding: 12px;
	margin: 0 auto 6em;

	@media only screen and (min-width: 625px) {
		max-width: 425px;
		background-color: var(--pry);
		padding: 32px 28px 40px;
		border-radius: 18px;
		box-shadow: 0 4px 12px hsla(0, 0%, 0%, 0.05);
	}

	@media only screen and (min-width: 1024px) {
		font-size: 1.25em;
		max-width: 768px;
		padding: 40px 48px 64px;
	}

	header {
		display: flex;
		align-items: center;

		span {
			position: relative;
			overflow: hidden;
			width: 2em;
			aspect-ratio: 1 / 1;
			border-radius: 999px;

			&::before {
				content: "";
				position: absolute;
				inset: 0;
				background-color: var(--sec);
				opacity: 0.1;
				border-radius: inherit;
				z-index: 0;
			}

			&::after {
				content: attr(data-index);
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-62.5%, -40%);
				z-index: 1;
			}
		}
	}

	h3 {
		display: inline-block;
		position: relative;
		z-index: 1;
		font-size: 1.8em;
		font-weight: lighter;
		line-height: 1;
		margin: 0.625em 0 0.33333em;

		@media only screen and (min-width: 1024px) {
			margin: 1.5em 0 0.625em;
		}

		svg {
			position: absolute;
			z-index: 0;
			inset: 100% 0 auto 0;
			transform: translateY(-50%);
		}
	}
`

const tabs = {
	[uuidv4()]: {
		title: "Tell us about yourself",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi itaque ab vel debitis nisi error culpa consectetur tenetur fuga maiores!",
	},
	[uuidv4()]: {
		title: "Open your account",
		content:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae cum animi dolorem sed nulla alias mollitia aperiam. In, veniam laudantium.",
	},
	[uuidv4()]: {
		title: "Sit back and relax",
		content:
			"Fugiat magni est ea voluptatum itaque hic eaque id velit laboriosam sunt tempora, nulla tenetur aperiam placeat! Quod, voluptate placeat.",
	},
}

function HowItWorks() {
	const [selectedTab, setSelectedTab] = React.useState(Object.keys(tabs)[0])

	return (
		<section id="how_it_works">
			<Wrapper>
				<SectionDesc>
					<h2>How It Works</h2>
					<p>
						AfroInvest - Ai, takes away the hassle of managing your investments. Focus on what really matters and let
						your money work for you.
					</p>
				</SectionDesc>
				<div>
					<TabSelectorDiv>
						{Object.keys(tabs).map((o) => (
							<label key={o} htmlFor={o}>
								<input
									onChange={({ target }) => setSelectedTab(target.value)}
									checked={selectedTab === o}
									type="radio"
									name="how_it_works-tab_selector"
									id={o}
									value={o}
								/>
								<span>{tabs[o].title}</span>
							</label>
						))}
					</TabSelectorDiv>
					<div aria-live="polite">
						<Tab>
							<header>
								<span data-index={Object.keys(tabs).findIndex((key) => key === selectedTab) + 1} />
							</header>
							<div>
								<h3>
									{tabs[selectedTab].title}
									<Underline />
								</h3>
								<p>{tabs[selectedTab].content}</p>
							</div>
						</Tab>
					</div>
				</div>
			</Wrapper>
		</section>
	)
}

export default HowItWorks
