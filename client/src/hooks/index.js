import { Color } from "@app/components/common/notify"
import { default as __axios } from "axios"
import React from "react"
import { useNotify } from "../context/notify-context"

const axios = __axios.create({ baseURL: "/gwy" })

export function GetRandomNumber(min = 0, max = 1) {
	return Math.random() * (max - min + 1) + min
}

export function useField(type) {
	const [value, setValue] = React.useState("")

	const types = {
		email: {
			regex: /^[^\s@]+@[^\s@]+\.[^\W_]+$/,
		},
		password: {
			minLength: 12,
			regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d]{12,}$/,
		},
		text: {
			minLength: 3,
			maxLength: 64,
			regex: /^[a-zA-Z](?:[\s-'.][a-zA-Z])*$/,
		},
	}

	const onChange = ({ target }) => setValue(target.value)

	return { type, value, onChange }
}

export function useSubmission(url) {
	const [processing, setProcessing] = React.useState(false)
	const [data, setData] = React.useState(null)
	const { appendNotification } = useNotify()

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
				appendNotification({
					type: Color.error,
					message: e.response.data.error,
				})

			appendNotification({
				type: Color.error,
				message: e.message,
			})
		} finally {
			setProcessing(false)
		}
	}

	return { handleSubmit: async (e, formData) => await submitHandler(e, formData), processing, data }
}

export function useResource(url) {
	const [resources, setResources] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const { appendNotification } = useNotify()

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
					return appendNotification({
						type: Color.error,
						message: err.response.data.error,
					})

				appendNotification({
					type: Color.error,
					message: err.message,
				})
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

export function mergedSetTimeout(action1Fn, action2Fn, delay1, delay2) {
	const timeoutId = setTimeout(() => {
		action1Fn()
		setTimeout(action2Fn, delay2)
	}, delay1)

	return () => clearTimeout(timeoutId)
}
