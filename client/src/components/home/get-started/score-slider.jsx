import { Error } from "@app/assets/illustrations"
import Spinner from "@app/components/common/spinner"
import { useResource } from "@app/hooks"
import React from "react"
import styled from "styled-components"

const SliderWrapper = styled.div`
	color: #fff;
	background-color: var(--sec);
	box-shadow: 0 0 0 100vmax var(--sec);
	clip-path: inset(0 -100vmax);
	padding-block: 24px;

	@media only screen and (min-width: 768px) {
		box-shadow: none;
		clip-path: none;
		border-radius: 10px;
		padding-inline: 24px;
	}

	& > div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 0 12px;

		p span {
			font-weight: lighter;
		}

		& > span {
			font-weight: lighter;
			opacity: 62.5%;
		}

		& + label[for] {
			display: block;
			position: relative;

			input {
				width: 100%;
				height: 8px;
				-webkit-appearance: none;
				appearance: none;
				background-image: linear-gradient(to right, transparent, var(--pry));
				background-repeat: no-repeat;
				border-radius: 999px;

				&::-webkit-slider-thumb {
					-webkit-appearance: none;
					appearance: none;
					width: 16px;
					aspect-ratio: 1 / 1;
					border-radius: 999px;
					background-color: #fff;
					transition: box-shadow 0.2s ease-in-out;
				}

				&::-moz-range-thumb {
					width: 16px;
					aspect-ratio: 1 / 1;
					border-radius: 999px;
					background-color: #fff;
					transition: box-shadow 0.2s ease-in-out;
				}

				&:focus {
					&::-webkit-slider-thumb {
						box-shadow:
							0 0 0 2px var(--sec),
							0 0 0 4px #fff;
					}

					&::-moz-range-thumb {
						box-shadow:
							0 0 0 2px var(--sec),
							0 0 0 4px #fff;
					}
				}
			}
		}
	}
`

const RiskDetails = styled.div`
	margin: 20px 0 6em;
	min-height: 340px;
	position: relative;
	z-index: 1;

	@media only screen and (min-width: 768px) {
		margin-bottom: 0;
	}

	.score-data {
		display: grid;
		grid-template-rows: repeat(10, 32px);
		gap: 2px 0;

		div {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			gap: 24px;
			position: relative;

			&:not(:last-child):after {
				content: "";
				position: absolute;
				inset: calc(100% - 1px) 0 -1px 0;
				background-color: hsl(0, 0%, 95%);
			}

			span {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				grid-column: span 3;

				@media only screen and (min-width: 1366px) {
					grid-column: span 2;
				}

				& + i {
					all: unset;
					display: block;
					height: 100%;
					position: relative;
					grid-column: span 4;

					@media only screen and (min-width: 1366px) {
						grid-column: span 5;
					}

					&::before {
						content: "";
						position: absolute;
						inset: 0;
						background-color: var(--sec);
						opacity: 0.875;
					}

					&::after {
						content: attr(data-percentage);
						position: absolute;
						font-weight: lighter;
						max-width: none;
						transform: translate(37.5%, 10%);
						left: 100%;
						font-weight: bolder;
					}
				}
			}
		}
	}
`

const LoaderWrapper = styled.div`
	font-weight: lighter;
	font-size: 0.875em;
	font-size: 1.5em;
	position: absolute;
	z-index: 1;
	inset: 0;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;

	div {
		text-align: center;

		span {
			color: #f44336;
			display: inline-block;
			width: 100%;
			font-weight: 600;
		}

		p {
			margin-inline: auto;
			font-size: 0.75em;
			max-width: 65%;

			@media only screen and (min-width: 768px) {
				max-width: 67%;
			}

			@media only screen and (min-width: 1024px) {
				max-width: 62.5%;
			}

			@media only screen and (min-width: 1366px) {
				max-width: 57%;
			}
		}
	}
`

function RiskScoreSlider() {
	const [score, setScore] = React.useState(6)
	const { resource, processing } = useResource(`/risks/${score}`)

	return (
		<div style={{ alignSelf: "start" }}>
			<SliderWrapper>
				<div>
					<p aria-live="polite" aria-atomic="true">
						Stability preference: <span>{score}</span>
					</p>
					<span>Demo Portfolio</span>
				</div>
				<label htmlFor="risk-score">
					<input
						type="range"
						id="risk-score"
						name="score-slider"
						min={0}
						max={10}
						value={score}
						onChange={({ target }) => setScore(parseInt(target.value, 10))}
					/>
				</label>
			</SliderWrapper>
			<RiskDetails aria-live="polite">
				{processing && !resource && (
					<LoaderWrapper>
						<Spinner />
						<p>Calibrating portfolio...</p>
					</LoaderWrapper>
				)}
				{!processing && resource && (
					<div className="score-data">
						<div>
							<span>Nigerian Stocks:</span>
							<i data-percentage={resource.stocks.local + "%"} style={{ width: `${resource.stocks.local}%` }} />
						</div>
						<div>
							<span>Foreign Stocks:</span>
							<i data-percentage={resource.stocks.foreign + "%"} style={{ width: `${resource.stocks.foreign}%` }} />
						</div>
						<div>
							<span>Tech Stocks:</span>
							<i data-percentage={resource.stocks.tech + "%"} style={{ width: `${resource.stocks.tech}%` }} />
						</div>
						<div>
							<span>Emerging Stocks:</span>
							<i data-percentage={resource.stocks.emerging + "%"} style={{ width: `${resource.stocks.emerging}%` }} />
						</div>
						<div>
							<span>Nigerian Bonds:</span>
							<i data-percentage={resource.bonds.local + "%"} style={{ width: `${resource.bonds.local}%` }} />
						</div>
						<div>
							<span>Foreign Bonds:</span>
							<i data-percentage={resource.bonds.foreign + "%"} style={{ width: `${resource.bonds.foreign}%` }} />
						</div>
						<div>
							<span>Commodities</span>
							<i data-percentage={resource.commodities + "%"} style={{ width: `${resource.commodities}%` }} />
						</div>
						<div>
							<span>Real Estate:</span>
							<i data-percentage={resource["real estate"] + "%"} style={{ width: `${resource["real estate"]}%` }} />
						</div>
						<div>
							<span>T-Bills:</span>
							<i data-percentage={resource["t-bills"] + "%"} style={{ width: `${resource["t-bills"]}%` }} />
						</div>
						<div>
							<span>Alternative:</span>
							<i data-percentage={resource.alternative + "%"} style={{ width: `${resource.alternative}%` }} />
						</div>
					</div>
				)}
				{!processing && !resource && (
					<LoaderWrapper>
						<Error />
						<div>
							<p>Something went wrong, adjust the slider to try again.</p>
						</div>
					</LoaderWrapper>
				)}
			</RiskDetails>
		</div>
	)
}

export default RiskScoreSlider
