import { ReactComponent as Loader } from "@app/assets/loader.svg"
import React from "react"
import styled, { keyframes } from "styled-components"

const spinKeyframe = keyframes`
  from {
    transform: rotate(0turn);
  } to {
    transform: rotate(1turn);
  }
`

const SpinnerContainer = styled.div`
	display: inline-block;

	svg {
		animation: ${spinKeyframe} 0.8s linear infinite;
	}
`

function Spinner() {
	return (
		<SpinnerContainer>
			<Loader />
		</SpinnerContainer>
	)
}

export default React.memo(Spinner)
