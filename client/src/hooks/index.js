import { default as __axios } from "axios"
import React from "react"

const axios = __axios.create({ baseURL: "/gwy" })

export function GetRandomNumber(min = 0, max = 1) {
	return Math.random() * (max - min + 1) + min
}

export function useField(type) {
	const [value, setValue] = React.useState("")
	const [error, setError] = React.useState(null)
	const [touched, setTouched] = React.useState(false)

	const types = {
		email: {
			regex: /^[^\s@]+@[^\s@]+\.[^\W_]+$/,
		},
		password: {
			minLength: 8,
			maxLength: Infinity,
			regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
		},
	}

	React.useEffect(() => checkValidity(value), [])

	const checkValidity = (v) => {
		try {
			const fieldType = types[type]
			if (!fieldType) throw new Error(`Invalid field type: ${type}`)

			Object.keys(fieldType).forEach((rule) => {
				if (!v.trim() && ["minLength", "maxLength"].includes(rule)) return

				const validation = fieldType[rule]
				const isValid =
					rule === "regex"
						? validation.test(v)
						: rule === "minLength"
							? v.trim().length >= validation
							: rule === "maxLength"
								? v.trim().length <= validation
								: Boolean(v)

				if (v.trim() && !isValid) {
					return setError(
						`${type} ${
							rule === "regex"
								? "doesn't meet the required format"
								: `must be ${rule === "minLength" ? "at least" : "at most"} ${validation} characters long`
						}`,
					)
				}

				setError(null)
			})
		} catch ({ message }) {
			console.error("Error during validation:", message)
			setError("An unexpected error occurred during validation.")
		}
	}

	const onChange = ({ target }) => setValue(target.value)

	const onBlur = ({ target }) => setTouched(Boolean(target.value.trim()))

	return { type, value, onChange, error, onBlur, touched }
}

export function useSubmission(url) {
	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState(null)
	const [responseData, setResponseData] = React.useState(null)

	const submitHandler = async (e, formData) => {
		e.preventDefault()

		setResponseData(null)
		setIsLoading(true)
		setError(null)

		const delay = GetRandomNumber(1000, 2000)

		try {
			await new Promise(($) => setTimeout($, delay))
			const { data } = await axios.post(url, formData)
			setResponseData(data)
		} catch (e) {
			if (e.response.data.error) setError(e.response.data.error)
			else setError(e.message)
		} finally {
			setIsLoading(false)
		}
	}

	return { handleSubmit: async (e, formData) => await submitHandler(e, formData), isLoading, error, responseData }
}

export function useResource(url) {
	const [resources, setResources] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState(null)

	function debounce(cb) {
		const delay = GetRandomNumber(1000, 2000)

		return async (...args) => {
			setLoading(true)
			setResources(null)
			setError(null)

			try {
				await new Promise(($) => setTimeout($, delay))
				await cb(...args)
			} catch (e) {
				if (e.response.data.error) setError(e.response.data.error)
				else setError(e.message)
			} finally {
				setLoading(false)
			}
		}
	}

	const services = {
		fetchResources: debounce(async () => {
			const response = await axios.get(url)
			setResources(response.data)
		}),
		updateResource: debounce(async (resourceId, updatedData) => {
			const response = await axios.patch(`${url}/${resourceId}`, updatedData)
			setResources(response.data)
		}),
		createResource: debounce(async (newData) => {
			const response = await axios.post(url, newData)
			setResources(response.data)
		}),
		deleteResource: debounce(async (resourceId) => {
			const response = await axios.delete(`${url}/${resourceId}`)
			setResources(response.data)
		}),
	}

	React.useEffect(() => {
		services.fetchResources()
	}, [url])

	return [resources, services, loading, error]
}
