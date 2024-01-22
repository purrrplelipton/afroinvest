import { ReactComponent as InvestingBro } from '@app/assets/investing-bro.svg';
import { ReactComponent as SavingsBro } from '@app/assets/savings-bro.svg';
import { ReactComponent as SearchEnginesBro } from '@app/assets/search-engines-bro.svg';
import { Wrapper } from '@app/components/common/wrapper';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled(Wrapper)`
	& > div {
		h2 {
			font-size: 2em;
			text-align: center;
			margin: 0.375em 0 0.625em;
		}
	}
`;

const PointsDisplay = styled.div`
	& > div {
		display: flex;
		flex-direction: column;
		align-items: stretch;

		&:not(:last-child) {
			margin-bottom: 1.25em;
		}

		@media only screen and (min-width: 625px) {
			gap: 1.25em;
			flex-direction: row;
			align-items: center;

			&:nth-child(even) {
				flex-direction: row-reverse;
			}

			& > * {
				width: 50%;
			}
		}

		@media only screen and (min-width: 1024) {
			gap: 2.5em;
		}

		p {
			margin: 0.375em 0 0.625em;
			font-weight: lighter;
		}
	}
`;

function WhyUs() {
	return (
		<section id="why_us">
			<StyledWrapper>
				<div>
					<h2>Why choose AfroInvest</h2>
					<PointsDisplay>
						<div>
							<InvestingBro />
							<p>
								AfroInvest gives you access to a whole new world of investment with a simplified
								5-minute experience.
							</p>
						</div>
						<div>
							<SavingsBro />
							<p>
								AfroInvest fees are a lot lower than regular investment advisory fees as the whole
								process is automated.
							</p>
						</div>
						<div>
							<SearchEnginesBro />
							<p>
								With globally low interest rates, investing your money in long term portfolios has
								never been this attractive.
							</p>
						</div>
					</PointsDisplay>
				</div>
			</StyledWrapper>
		</section>
	);
}

export default WhyUs;
