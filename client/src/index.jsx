import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { MenuProvider } from "./context/menu-context"
import "./index.css"
import Home from "./views/home"
import SignIn from "./views/sign-in"

const router = createBrowserRouter([
	{
		path: "/signIn",
		element: <SignIn />,
	},
	{
		path: "/",
		element: <Home />,
	},
])

const root = createRoot(document.getElementById("root"))
root.render(
	<StrictMode>
		<MenuProvider>
			<RouterProvider router={router} />
		</MenuProvider>
	</StrictMode>,
)
