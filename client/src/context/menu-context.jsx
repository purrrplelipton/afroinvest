import { element, node, oneOfType } from "prop-types"
import React from "react"

const MenuContext = React.createContext()

function MenuProvider(props) {
	const [menuVisible, setMenuVisible] = React.useState(false)

	React.useEffect(() => {
		const { documentElement: root } = window.document
		root.setAttribute("data-menuVisible", menuVisible)
	}, [menuVisible])

	return <MenuContext.Provider value={[menuVisible, setMenuVisible]}>{props.children}</MenuContext.Provider>
}

MenuProvider.propTypes = { children: oneOfType([element, node]) }

export function useMenu() {
	const context = React.useContext(MenuContext)
	if (!context) {
		throw new Error("`useMenu` must be used within `MenuProvider`")
	}
	return context
}

export default MenuProvider
