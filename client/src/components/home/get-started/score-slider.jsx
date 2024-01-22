import { ReactComponent as Loader } from '@app/assets/loader.svg';
import { ReactComponent as NoData } from '@app/assets/no-data.svg';
import { GetRiskData } from '@app/services';
import React from 'react';
import styled, { keyframes } from 'styled-components';

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
`;

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
				content: '';
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
						content: '';
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
`;

const rotate = keyframes`
  from {
    transform: rotate(0turn);
  } to {
    transform: rotate(1turn);
  }
`;

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

	svg[data-is_loader='true'] {
		animation: ${rotate} 0.875s linear infinite;
	}

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
`;

function RiskScoreSlider() {
	const [score, setScore] = React.useState(6);
	const [fetching, setFetching] = React.useState(false);
	const [scoreData, setScoreData] = React.useState(null);
	const [fetchingError, setFetchingError] = React.useState(null);

	React.useEffect(() => {
		const timer = setTimeout(async () => {
			try {
				setFetching(true);
				const { data } = await GetRiskData(score);
				setScoreData(data);
			} catch (error) {
				console.error(error.message);
				console.log(error);
				setFetchingError(error);
			} finally {
				setFetching(false);
			}
		}, 1000);

		return () => clearTimeout(timer);
	}, [score]);

	const slideChangeHandler = (value) => {
		setFetching(true);
		setScoreData(null);
		setFetchingError(null);
		setScore(parseInt(value, 10));
	};

	return (
		<div style={{ alignSelf: 'start' }}>
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
						onChange={({ target }) => slideChangeHandler(target.value)}
					/>
				</label>
			</SliderWrapper>
			<RiskDetails aria-live="polite">
				{fetching && !scoreData && !fetchingError && (
					<LoaderWrapper>
						<Loader data-is_loader="true" />
						<p>Calibrating portfolio...</p>
					</LoaderWrapper>
				)}
				{!fetching && scoreData && !fetchingError && (
					<div className="score-data">
						<div>
							<span>Nigerian Stocks:</span>
							<i
								data-percentage={scoreData.stocks.local + '%'}
								style={{ width: `${scoreData.stocks.local}%` }}
							/>
						</div>
						<div>
							<span>Foreign Stocks:</span>
							<i
								data-percentage={scoreData.stocks.foreign + '%'}
								style={{ width: `${scoreData.stocks.foreign}%` }}
							/>
						</div>
						<div>
							<span>Tech Stocks:</span>
							<i
								data-percentage={scoreData.stocks.tech + '%'}
								style={{ width: `${scoreData.stocks.tech}%` }}
							/>
						</div>
						<div>
							<span>Emerging Stocks:</span>
							<i
								data-percentage={scoreData.stocks.emerging + '%'}
								style={{ width: `${scoreData.stocks.emerging}%` }}
							/>
						</div>
						<div>
							<span>Nigerian Bonds:</span>
							<i
								data-percentage={scoreData.bonds.local + '%'}
								style={{ width: `${scoreData.bonds.local}%` }}
							/>
						</div>
						<div>
							<span>Foreign Bonds:</span>
							<i
								data-percentage={scoreData.bonds.foreign + '%'}
								style={{ width: `${scoreData.bonds.foreign}%` }}
							/>
						</div>
						<div>
							<span>Commodities</span>
							<i
								data-percentage={scoreData.commodities + '%'}
								style={{ width: `${scoreData.commodities}%` }}
							/>
						</div>
						<div>
							<span>Real Estate:</span>
							<i
								data-percentage={scoreData['real estate'] + '%'}
								style={{ width: `${scoreData['real estate']}%` }}
							/>
						</div>
						<div>
							<span>T-Bills:</span>
							<i
								data-percentage={scoreData['t-bills'] + '%'}
								style={{ width: `${scoreData['t-bills']}%` }}
							/>
						</div>
						<div>
							<span>Alternative:</span>
							<i
								data-percentage={scoreData.alternative + '%'}
								style={{ width: `${scoreData.alternative}%` }}
							/>
						</div>
					</div>
				)}
				{!fetching && !scoreData && fetchingError && (
					<LoaderWrapper>
						<NoData />
						<div>
							{fetchingError.statusCode && <span>{fetchingError.statusCode}</span>}
							<p>Something went wrong, adjust the slider to try again.</p>
						</div>
					</LoaderWrapper>
				)}
			</RiskDetails>
		</div>
	);
}

export default RiskScoreSlider;
