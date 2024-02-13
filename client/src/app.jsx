import React from "react"
import { Route, Routes } from "react-router-dom"
import Fallback from "./components/fallback"
import MenuProvider from "./context/menu-context"
import NotifyProvider from "./context/notify-context"
import Home from "./views/home"

const SignUp = React.lazy(() => import("./views/sign-up"))
const SignIn = React.lazy(() => import("./views/sign-in"))

function App() {
	return (
		<React.Suspense fallback={<Fallback />}>
			<MenuProvider>
				<NotifyProvider>
					<Routes>
						<Route path="/" index element={<Home />} />
						<Route path="SignUp/*" element={<SignUp />} />
						<Route path="SignIn" element={<SignIn />} />
					</Routes>
				</NotifyProvider>
			</MenuProvider>
		</React.Suspense>
	)
}

export default App
