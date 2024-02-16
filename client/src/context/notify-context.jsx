/* eslint-disable indent */
import { Check, CircleX, ExclamationMark, Info, X } from "@app/assets/icons"
import { Btn } from "@app/components/common/button"
import { Color } from "@app/hooks"
import { element, node, oneOfType } from "prop-types"
import React from "react"
import styled, { css } from "styled-components"
import { v4 } from "uuid"

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

const Container = styled.div`
	font-size: 0.875em;
	position: fixed;
	inset: 80px 0 auto 0;
	z-index: 9999;

	& > div {
		position: relative;
		padding-inline: 12px;
		display: flex;
		flex-flow: column nowrap;
		align-items: end;
		justify-content: start;
		gap: 12px;
	}
`

const NotifyContext = React.createContext()

function NotifyProvider(props) {
	const [notifications, setNotifications] = React.useState([])

	const appendNotification = ({ type, message }) =>
		setNotifications((prvNtfs) => [{ id: v4(), type, message }, ...prvNtfs])

	const dismissNotification = (id) => setNotifications((prvNtfs) => prvNtfs.filter((ntf) => ntf.id !== id))

	const [dismissQueue, setDismissQueue] = React.useState([])

	React.useEffect(() => {
		let timeoutId

		if (dismissQueue.length) {
			timeoutId = setTimeout(() => {
				const dismissedId = dismissQueue[dismissQueue.length - 1]
				setDismissQueue((prv) => prv.slice(1))
				dismissNotification(dismissedId)
			}, 500)
			return () => clearTimeout(timeoutId)
		}
	}, [dismissQueue])

	React.useEffect(() => {
		let timeoutId

		if (notifications.length > 0 && dismissQueue.length === 0) {
			timeoutId = setInterval(() => setDismissQueue((prv) => [notifications[0].id, ...prv]), 5000)
		}

		return () => clearInterval(timeoutId)
	}, [notifications, dismissQueue])

	const getIcon = (ntfType) => {
		switch (ntfType) {
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

	return (
		<NotifyContext.Provider value={{ notifications, appendNotification, dismissNotification }}>
			<>
				{notifications.length > 0 && (
					<Container>
						<div>
							{notifications.map((ntf) => {
								const parsedType = Object.keys(Color).includes(ntf.type) ? ntf.type : "info"

								return (
									<NotificationWrapper key={ntf.id} $type={parsedType}>
										<div>
											{getIcon(parsedType)}
											<p>{ntf.message}</p>
										</div>
										<Btn aria-label="dismiss notification" onClick={() => setDismissQueue((prv) => [ntf.id, ...prv])}>
											<X />
										</Btn>
									</NotificationWrapper>
								)
							})}
						</div>
					</Container>
				)}
				{props.children}
			</>
		</NotifyContext.Provider>
	)
}

NotifyProvider.propTypes = { children: oneOfType([element, node]) }

export function useNotify() {
	const context = React.useContext(NotifyContext)
	if (!context) {
		throw new Error("`useNotify` must be used within `NotifyProvider`")
	}
	return context
}

export default NotifyProvider
