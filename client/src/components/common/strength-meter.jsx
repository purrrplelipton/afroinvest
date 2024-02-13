import { string } from "prop-types"
import React from "react"
import styled from "styled-components"
import { v4 } from "uuid"
import zxcvbn from "zxcvbn"

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	.meter {
		display: flex;
		align-items: center;
		gap: 8px;

		i {
			all: unset;
			height: 3px;
			border-radius: 999px;
			min-width: 52px;
			max-width: 64px;
			transition: background-color 0.2s;

			&:first-child {
				background-color: ${({ $score }) =>
					$score < 2 ? "#F44336" : $score >= 2 && $score < 4 ? "#FFC107" : "#4CAF50"};
			}

			&:not(:first-child, :last-child) {
				background-color: ${({ $score }) =>
					$score < 2 ? "hsla(0, 0%, 0%, 5%)" : $score >= 2 && $score < 4 ? "#FFC107" : "#4CAF50"};
			}

			&:last-child {
				background-color: ${({ $score }) => ($score < 4 ? "hsla(0, 0%, 0%, 8%)" : "#4CAF50")};
			}
		}
	}
`

function StrengthMeter(props) {
	const { password } = props
	const { score: __score } = zxcvbn(password)

	const getLabel = (score) => {
		switch (score) {
			case 0:
			case 1:
				return "weak"
			case 2:
			case 3:
				return "okay"
			case 4:
				return "strong"
			default:
				return "weak"
		}
	}

	if (password)
		return (
			<Wrapper $score={__score}>
				<div className="meter">
					{Array.from({ length: 3 }).map(() => (
						<i key={v4()} />
					))}
				</div>
				<p>{getLabel(__score)}</p>
			</Wrapper>
		)
	return null
}

StrengthMeter.propTypes = { password: string.isRequired }

export default StrengthMeter
