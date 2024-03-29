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

	function clickFunc() {
		navigate(-1)
		if ($props.onClick && typeof $props.onClick === "function") {
			$props.onClick()
		}
	}

	return (
		<Btn {...$props} ref={$ref} onClick={clickFunc}>
			<ArrowLeft />
		</Btn>
	)
})

GoBack.displayName = "GoBack"

const SignIn = React.forwardRef(($props, $ref) => {
	const navigate = useNavigate()

	function clickFunc() {
		navigate("/SignIn", { replace: $props.$replace ? true : false })
		if ($props.onClick && typeof $props.onClick === "function") {
			$props.onClick()
		}
	}

	return (
		<BlueBtn {...$props} ref={$ref} onClick={clickFunc}>
			<span>Sign in</span>
		</BlueBtn>
	)
})

SignIn.displayName = "SignIn"

const GetStarted = React.forwardRef(($props, $ref) => {
	const navigate = useNavigate()

	function clickFunc() {
		navigate("/GetStarted")
		if ($props.onClick && typeof $props.onClick === "function") {
			$props.onClick()
		}
	}

	return (
		<BlueBtn {...$props} ref={$ref} onClick={clickFunc}>
			<span>Get started</span>
		</BlueBtn>
	)
})

GetStarted.displayName = "GetStarted"

export { BlueBtn, Btn, GetStarted, GoBack, SignIn }
