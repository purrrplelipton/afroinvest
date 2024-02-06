import Spinner from "@app/components/common/spinner"
import React from "react"
import styled from "styled-components"

const Overlay = styled.div`
	position: fixed;
	inset: 0;
	display: grid;
	place-items: center;
`

function Fallback() {
	return (
		<Overlay>
			<Spinner />
		</Overlay>
	)
}

export default React.memo(Fallback)
