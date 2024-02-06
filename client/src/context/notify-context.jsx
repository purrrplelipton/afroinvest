import { element, node, oneOfType } from "prop-types"
import React from "react"

const NotifyContext = React.createContext()

function NotifyProvider(props) {
	const [notifications, setNotifications] = React.useState([])

	return <NotifyContext.Provider value={[notifications, setNotifications]}>{props.children}</NotifyContext.Provider>
}

NotifyProvider.propTypes = { children: oneOfType([node, element]) }

export function useNotify() {
	const context = React.useContext(NotifyContext)
	if (!context) {
		throw new Error("`useNotify` must be used within `NotifyProvider`")
	}
	return context
}

export default NotifyProvider
