import React from "react"

export function useField(type) {
	const [value, setValue] = React.useState("")

	const onChange = ({ target }) => setValue(target.value)

	return { type, value, onChange }
}
