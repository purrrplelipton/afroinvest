import { element, node, oneOfType } from "prop-types"
import React from "react"
import { v4 } from "uuid"

const NotifyContext = React.createContext()

function NotifyProvider(props) {
	const [notifications, setNotifications] = React.useState([])

	const appendNotification = ({ type, message }) =>
		setNotifications((prevNotifications) => [{ id: v4(), type, message }, ...prevNotifications])

	const dismissNotification = (id) =>
		setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id))

	return (
		<NotifyContext.Provider value={{ notifications, appendNotification, dismissNotification }}>
			{props.children}
		</NotifyContext.Provider>
	)
}

Notification.propTypes = { children: oneOfType([element, node]) }

export function useNotify() {
	const context = React.useContext(NotifyContext)
	if (!context) {
		throw new Error("`useNotify` must be used within `NotifyProvider`")
	}
	return context
}

export default NotifyProvider
