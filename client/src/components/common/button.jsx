import { ArrowLeft } from "@app/assets/icons"
import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Btn = styled.button.attrs(({ $type = "button" }) => ({
	type: ["button", "submit", "reset"].includes($type) ? $type : "button",
}))`
	line-height: 1.125;
	font-weight: lighter;
	position: relative;

	&:before {
		position: absolute;
		inset: 50% auto auto 50%;
		transform: translate(-50%, -50%);
		width: calc(100% + 16px);
		aspect-ratio: 1 / 1;
		z-index: -1;
		background-color: var(--sec);
		opacity: 3%;
		border-radius: 999px;
	}

	&:hover {
		&::before {
			content: "";
		}
	}

	&:focus {
		border-radius: 999px;
		outline-color: currentColor;
	}
`

const BlueBtn = styled(Btn)`
	color: #fff;
	background-color: var(--sec);
	border-radius: 10px;
	padding: 0.75em 1em 0.625em;

	&:hover {
		&::before {
			border-radius: 12px;
			width: calc(100% + 12px);
			height: calc(100% + 12px);
		}
	}

	&:focus {
		border-radius: 10px;
		outline-offset: -3px;
	}
`

const GoBack = React.forwardRef(($props, $ref) => {
	const navigate = useNavigate()

	return (
		<Btn {...$props} ref={$ref} onClick={() => navigate(-1)}>
			<ArrowLeft />
		</Btn>
	)
})

GoBack.displayName = "GoBack"

const SignIn = React.forwardRef(($props, $ref) => {
	const navigate = useNavigate()

	return (
		<BlueBtn {...$props} ref={$ref} onClick={() => navigate("/signIn")}>
			<span>Sign in</span>
		</BlueBtn>
	)
})

SignIn.displayName = "SignIn"

const GetStarted = React.forwardRef(($props, $ref) => {
	const navigate = useNavigate()

	return (
		<BlueBtn {...$props} ref={$ref} onClick={() => navigate("/getStarted")}>
			<span>Get started</span>
		</BlueBtn>
	)
})

GetStarted.displayName = "GetStarted"

export { BlueBtn, Btn, GetStarted, GoBack, SignIn }
