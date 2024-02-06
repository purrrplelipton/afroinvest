/* eslint-disable indent */
import { Check, CircleX, ExclamationMark, Info, X } from "@app/assets/icons"
import { Btn } from "@app/components/common/button"
import { mergedSetTimeout } from "@app/hooks"
import { element, func, node, oneOf, oneOfType } from "prop-types"
import React from "react"
import styled, { css, keyframes } from "styled-components"

const SlideIn = keyframes`
	from {
		opacity: 0;
		transform: translateX(150%);
	} to {
		opacity: 1;
		transform: translateX(0);
	}
`

const SlideOut = keyframes`
	from {
		opacity: 1;
		transform: translateX(0);
	} to {
		opacity: 0;
		transform: translateX(150%);
	}
`

const NotificationWrapper = styled.div`
	${({ $type }) => css`
		--color-type: ${$type === "error"
			? "#F44336"
			: $type === "success"
				? "#4CAF50"
				: $type === "warning"
					? "#FFC107"
					: "#2196F3"};
	`}
	position: relative;
	z-index: 99999;
	overflow: hidden;
	padding: 12px 16px;
	border-radius: 10px;
	color: var(--color-type);
	background-color: var(--pry);
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	max-width: 320px;

	${({ $visible }) => css`
		opacity: ${$visible ? 1 : 0};
		transform: translateX(${$visible ? 0 : "150%"});
		animation: ${$visible ? SlideIn : SlideOut} 0.5s ease-in-out both;
		max-height: ${$visible ? "0" : "none"};
	`}

	@media only screen and (min-width: 768px) {
		max-width: 375px;
	}

	&::before {
		content: "";
		position: absolute;
		z-index: -1;
		inset: 0;
		border-radius: inherit;
		background-color: var(--color-type);
		opacity: 5%;
	}

	& > div {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 8px;

		& > svg {
			flex-shrink: 0;

			& + p {
				width: 100%;
			}
		}
	}

	& > button {
		flex-shrink: 0;
	}
`

export const Color = {
	info: "info",
	success: "success",
	warning: "warning",
	error: "error",
}

function Notify(props) {
	const { type, dismissFN, children } = props
	const [visible, setVisible] = React.useState(false)

	const parsedType = Object.keys(Color).includes(type) ? type : "info"

	const getIcon = (type) => {
		switch (type) {
			case Color.success:
				return <Check />
			case Color.error:
				return <CircleX />
			case Color.warning:
				return <ExclamationMark />
			default:
				return <Info />
		}
	}

	React.useEffect(() => {
		mergedSetTimeout(
			() => setVisible(true),
			() => setVisible(false),
			100,
			4500,
		)
	}, [visible])

	return (
		<NotificationWrapper $type={parsedType} $visible={visible}>
			<div>
				{getIcon(parsedType)}
				<p>{children}</p>
			</div>
			<Btn aria-label="dismiss notification" onClick={dismissFN}>
				<X />
			</Btn>
		</NotificationWrapper>
	)
}

Notify.propTypes = {
	type: oneOf(Object.keys(Color)).isRequired,
	dismissFN: func.isRequired,
	children: oneOfType([node, element]).isRequired,
}

export default Notify
