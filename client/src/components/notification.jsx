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
	const [notifications, setNotifications] = useNotify()

	React.useEffect(() => {
		let timeoutId = null

		if (notifications.length) {
			timeoutId = setInterval(() => {
				setNotifications((prvNotifs) => prvNotifs.slice(1))
			}, 5000)
		}

		return () => clearInterval(timeoutId)
	}, [notifications])

	if (notifications.length)
		return (
			<Container>
				<div>
					{notifications.map(({ id, ...rs }) => (
						<Notify
							key={id}
							type={rs.type}
							dismissFN={() => setNotifications((prv) => prv.filter((nt) => nt.id !== id))}
						>
							{rs.message}
						</Notify>
					))}
				</div>
			</Container>
		)

	return null
}

export default Notification
