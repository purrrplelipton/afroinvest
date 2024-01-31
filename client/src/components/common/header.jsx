import { NavbarCollapse, NavbarExpand } from "@app/assets/icons"
import { useMenu } from "@app/context/menu-context"
import React from "react"
import styled from "styled-components"
import { v4 as uuidv4 } from "uuid"
import { Btn, SignIn } from "./button"
import Logo from "./logo"
import Wrapper from "./wrapper"

const HeaderContainer = styled.header.attrs(({ $menuVisible = false, $isTop = false }) => ({
	$menuVisible,
	$isTop,
}))`
	transition:
		background-color 0.2s ease-in-out,
		box-shadow 0.125s ease-in-out;
	position: sticky;
	z-index: 99;
	inset: 0 0 auto 0;
	background-color: ${({ $menuVisible, $isTop }) =>
		(!$menuVisible && !$isTop) || $menuVisible ? "var(--pry)" : "transparent"};
	box-shadow: ${({ $menuVisible, $isTop }) =>
		!$menuVisible && !$isTop ? "0 4px 12px hsla(0, 0%, 0%, 0.03)" : "0 4px 12px #0000"};
	background-image: linear-gradient(to top, transparent, var(--pry));
	background-repeat: no-repeat;
`

const ContentWrapper = styled(Wrapper)`
	max-width: 1366px;
	padding: 20px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const MenuToggle = styled(Btn)`
	pointer-events: auto;

	@media only screen and (min-width: 1024px) {
		display: none;
	}
`

const Nav = styled.nav.attrs(({ $menuVisible = false }) => ({
	"aria-label": "main navigation",
	$menuVisible,
}))`
	position: absolute;
	z-index: 88;
	inset: calc((2.5em * 0.800375) + 40px) 0 auto 0;
	background-color: var(--pry);
	border-radius: 0 0 10px 10px;
	padding: 12px 0;
	box-shadow: 0 12px 12px hsla(0, 0%, 0%, 0.03);
	pointer-events: auto;
	display: ${(props) => (props.$menuVisible ? "initial" : "none")};

	@media only screen and (min-width: 1024px) {
		position: static;
		background-color: initial;
		border-radius: 0;
		padding: 0;
		box-shadow: initial;
		display: initial !important;
	}

	div {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		padding: 0 12px;

		@media only screen and (min-width: 1024px) {
			flex-flow: row nowrap;
			gap: 1em;
			align-items: center;
			padding: 0;

			Btn {
				margin-left: 2em;
			}
		}

		* {
			flex-shrink: 0;

			&[href] {
				line-height: 1.125;
				text-decoration: none;
				text-align: center;
				padding: 0.75em 1em 0.625em;
				position: relative;
				z-index: 1;

				@media only screen and (min-width: 1024px) {
					padding: 0.375em 0.4em 0.25em;
				}

				&::before {
					position: absolute;
					z-index: -1;
					inset: 0;
					background-color: var(--sec);
					opacity: 3%;
					border-radius: 8px;
				}

				&::after {
					content: "";
					position: absolute;
					inset: calc(100% - 1px) 0 -1px 0;
					background-color: hsla(0, 0%, 0%, 0.025);

					@media only screen and (min-width: 1024px) {
						content: none;
					}
				}

				&:hover::before {
					content: "";
				}

				&:focus {
					outline-offset: -2px;
					outline-color: var(--sec);
					border-radius: 8px;
				}

				span {
					z-index: 1;
				}
			}
		}
	}
`

const routes = [
	{ path: "#home", label: "Home" },
	{ path: "#how_it_works", label: "How it works" },
	{ path: "#why_us", label: "Why us" },
	{ path: "#faqs", label: "FAQs" },
].map((o) => ({ ...o, id: uuidv4() }))

function Header() {
	const { menuVisible, setMenuVisible } = useMenu()
	const menuToggleRef = React.useRef()
	const navRef = React.useRef()

	const [isTop, setIsTop] = React.useState(true)

	React.useEffect(() => {
		const handleScroll = () => setIsTop(window.scrollY < 64)
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	React.useEffect(() => {
		function clickOut(ev) {
			if (
				menuToggleRef.current &&
				!menuToggleRef.current.contains(ev.target) &&
				navRef.current &&
				!navRef.current.contains(ev.target)
			) {
				setMenuVisible(false)
			}
		}

		document.addEventListener("click", clickOut)

		return () => {
			document.removeEventListener("click", clickOut)
		}
	}, [setMenuVisible, menuToggleRef, navRef])

	return (
		<HeaderContainer $menuVisible={menuVisible} $isTop={isTop}>
			<ContentWrapper>
				<Logo />
				<MenuToggle
					ref={menuToggleRef}
					onClick={() => setMenuVisible((prv) => !prv)}
					aria-label={`${menuVisible ? "hide" : "show"} menu`}
					aria-haspopup="true"
					aria-expanded={menuVisible}
				>
					{menuVisible ? <NavbarCollapse /> : <NavbarExpand />}
				</MenuToggle>
				<Nav ref={navRef} $menuVisible={menuVisible}>
					<div>
						{routes.map((x) => (
							<a key={x.id} href={x.path} onClick={() => setMenuVisible(false)}>
								<span>{x.label}</span>
							</a>
						))}
						<SignIn onClick={() => setMenuVisible(false)} />
					</div>
				</Nav>
			</ContentWrapper>
		</HeaderContainer>
	)
}

export default Header
