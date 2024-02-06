import React from "react"
import { Route, Routes } from "react-router-dom"
import Fallback from "./components/fallback"
import Notification from "./components/notification"
import MenuProvider from "./context/menu-context"
import NotifyProvider from "./context/notify-context"
import Home from "./views/home"

const SignIn = React.lazy(() => import("./views/sign-in"))
const SignUp = React.lazy(() => import("./views/sign-up"))

function App() {
	return (
		<React.Suspense fallback={<Fallback />}>
			<MenuProvider>
				<NotifyProvider>
					<Notification />
					<Routes>
						<Route path="/" Component={Home} />
						<Route path="/signup" Component={SignUp} />
						<Route path="/signin" Component={SignIn} />
					</Routes>
				</NotifyProvider>
			</MenuProvider>
		</React.Suspense>
	)
}

export default App
