import React from 'react';
import styled from 'styled-components';

const LogoText = styled.span`
	font-size: 2.5em;
	height: 0.800375em;
	line-height: 1;
	font-weight: bolder;
`;

function Logo() {
	return <LogoText>Ai</LogoText>;
}

export default Logo;
