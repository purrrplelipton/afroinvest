import { default as __axios } from "axios"
import React from "react"
import { useNotify } from "../context/notify-context"

export const axios = __axios.create({ baseURL: "/gwy" })

export const Color = {
	info: "info",
	success: "success",
	warning: "warning",
	error: "error",
}

export function GetRandomNumber(min = 0, max = 1) {
	return Math.random() * (max - min + 1) + min
}

export function useField(type) {
	const [value, setValue] = React.useState("")

	return { type, value, onChange: ({ target }) => setValue(target.value) }
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
			if (res.message) {
				appendNotification({ type: Color.success, message: res.message })
			}

			setData(res)
		} catch (e) {
			if (e.response.data.error)
				return appendNotification({
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
	const [resource, setResource] = React.useState(null)
	const [processing, setProcessing] = React.useState(false)
	const { appendNotification } = useNotify()

	function debounce(cb) {
		const delay = GetRandomNumber(1000, 2000)

		return async (...args) => {
			setProcessing(true)
			setResource(null)

			try {
				await new Promise(($) => setTimeout($, delay))
				const { data } = await cb(...args)
				if (data.message) {
					appendNotification({ type: Color.success, message: data.message })
				}
				setResource(data)
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
				setProcessing(false)
			}
		}
	}

	const services = {
		fetchResources: debounce(async () => await axios.get(url)),
		updateResource: debounce(async (resourceId, updatedData) => await axios.patch(`${url}/${resourceId}`, updatedData)),
		createResource: debounce(async (newData) => await axios.post(url, newData)),
		deleteResource: debounce(async (resourceId) => await axios.delete(`${url}/${resourceId}`)),
	}

	React.useEffect(() => {
		services.fetchResources()
	}, [url])

	return { resource, services, processing }
}

export function mergedSetTimeout(action1Fn, action2Fn, delay1, delay2) {
	const timeoutId = setTimeout(() => {
		action1Fn()
		setTimeout(action2Fn, delay2)
	}, delay1)

	return () => clearTimeout(timeoutId)
}
