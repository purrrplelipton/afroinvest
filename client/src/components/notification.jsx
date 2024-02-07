import Notify from "@app/components/common/notify"
import { useNotify } from "@app/context/notify-context"
import React from "react"
import styled from "styled-components"

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

function Notification() {
	const { notifications, dismissNotification } = useNotify()
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

		if (notifications.length && !dismissQueue.length) {
			timeoutId = setInterval(() => setDismissQueue((prv) => [notifications[0].id, ...prv]), 5000)
		}

		return () => clearInterval(timeoutId)
	}, [notifications, dismissQueue])

	if (notifications.length)
		return (
			<Container>
				<div>
					{notifications.map(({ id, ...rs }) => (
						<Notify key={id} type={rs.type} dismissFN={() => setDismissQueue((prv) => [id, ...prv])}>
							{rs.message}
						</Notify>
					))}
				</div>
			</Container>
		)

	return null
}

export default Notification
