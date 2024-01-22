import React from 'react';
import styled from 'styled-components';

export const Button = styled.button.attrs(({ $type = 'button' }) => ({
	type: ['button', 'submit', 'reset'].includes($type) ? $type : 'button'
}))`
	line-height: 1.125;
	font-weight: lighter;

	&:focus {
		border-radius: 999px;
		outline-color: currentColor;
	}
`;

const GetStartedButton = styled.a.attrs(({ $href = '#get_started' }) => ({ href: $href }))`
	display: inline-block;
	text-decoration: none;
	line-height: 1.125;
	font-weight: lighter;
	color: #fff;
	background-color: var(--sec);
	border-radius: 10px;
	padding: 0.75em 1em 0.625em;
	transition: outline-color 0.2s ease-in-out;
	text-align: center;

	&:focus {
		border-radius: 10px;
		outline-offset: -3px;
		outline-color: currentColor;
	}
`;

export const GetStarted = React.forwardRef(($props, $ref) => {
	return (
		<GetStartedButton {...$props} ref={$ref}>
			<span>Get started</span>
		</GetStartedButton>
	);
});
