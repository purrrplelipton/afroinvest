import { Color } from "@app/components/common/notify"
import { default as __axios } from "axios"
import React from "react"
import { v4 } from "uuid"
import { useNotify } from "../context/notify-context"

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
			minLength: 12,
			maxLength: 64,
			regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,64}$/,
		},
		text: {
			minLength: 8,
			maxLength: Infinity,
			regex: /^[a-zA-Z]{2,24}(?:[\s-'.][a-zA-Z]{2,24})*$/,
		},
	}

	React.useEffect(() => checkValidity(value), [value])

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
		} catch (e) {
			console.error("Error during validation:", e.message)
			setError("An unexpected error occurred during validation.")
		}
	}

	const onChange = ({ target }) => setValue(target.value)

	const onBlur = ({ target }) => setTouched(Boolean(target.value.trim()))

	return { type, value, onChange, error, onBlur, touched }
}

export function useSubmission(url) {
	const [processing, setProcessing] = React.useState(false)
	const [data, setData] = React.useState(null)
	const [, setNotifications] = useNotify()

	const submitHandler = async (e, formData) => {
		e.preventDefault()

		if (processing) return

		setData(null)
		setProcessing(true)

		const delay = GetRandomNumber(1000, 2000)

		try {
			await new Promise(($) => setTimeout($, delay))
			const { data: res } = await axios.post(url, formData)
			setData(res)
		} catch (e) {
			if (e.response.data.error)
				return setNotifications((prv) =>
					prv.concat({
						id: v4(),
						type: Color.error,
						message: e.response.data.error,
					}),
				)
			setNotifications((prv) =>
				prv.concat({
					id: v4(),
					type: Color.error,
					message: e.message,
				}),
			)
		} finally {
			setProcessing(false)
		}
	}

	return { handleSubmit: async (e, formData) => await submitHandler(e, formData), processing, data }
}

export function useResource(url) {
	const [resources, setResources] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const [, setNotifications] = useNotify()

	function debounce(cb) {
		const delay = GetRandomNumber(1000, 2000)

		return async (...args) => {
			setLoading(true)
			setResources(null)

			try {
				await new Promise(($) => setTimeout($, delay))
				await cb(...args)
			} catch (err) {
				if (err.response.data.error)
					return setNotifications((prv) =>
						prv.concat({
							id: v4(),
							type: Color.error,
							message: err.response.data.error,
						}),
					)

				setNotifications((prv) =>
					prv.concat({
						id: v4(),
						type: Color.error,
						message: err.message,
					}),
				)
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

	return [resources, services, loading]
}

export function createNotification(props) {
	const { type, message } = props

	const parsedType = Object.keys(Color).includes(type) ? type : "info"

	return { id: v4(), type: parsedType, message }
}
export function mergedSetTimeout(action1Fn, action2Fn, delay1, delay2) {
	const timeoutId = setTimeout(() => {
		action1Fn()
		setTimeout(action2Fn, delay2)
	}, delay1)

	return () => clearTimeout(timeoutId)
}
