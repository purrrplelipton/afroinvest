import { MenuProvider } from "./context/menu-context"
import Home from "./views/home"
import React from "react"

function App() {
	return (
		<MenuProvider>
			<Home />
		</MenuProvider>
	)
}

export default App
