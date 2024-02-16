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
	if (min > max) [min, max] = [max, min]

	return Math.random() * (max - min) + min
}

export function useField(type) {
	const [value, setValue] = React.useState("")

	return {
		type,
		value,
		onChange: React.useCallback(({ target }) => setValue(target.value), [value, setValue]),
	}
}

export function useResource(apiRoute) {
	const [resource, setResource] = React.useState(null)
	const [processing, setProcessing] = React.useState(false)
	const { appendNotification } = useNotify()

	const debounceFN = React.useCallback(async (config) => {
		setProcessing(true)
		setResource(null)

		try {
			await new Promise(($) => setTimeout($, GetRandomNumber(1000, 2000)))
			const response = await axios(config)
			if (response.data.message) appendNotification({ type: Color.success, message: response.data.message })
			setResource(response.data)
			return response
		} catch (error) {
			if (error.response && error.response.data.error)
				appendNotification({ type: Color.error, message: error.response.data.error })
			else appendNotification({ type: Color.error, message: error.message })

			throw error
		} finally {
			setProcessing(false)
		}
	}, [])

	const fetchResource = React.useCallback(
		() =>
			debounceFN({
				method: "GET",
				url: apiRoute,
			}),
		[apiRoute, debounceFN],
	)

	const createResource = React.useCallback(
		(newResourceData) =>
			debounceFN({
				method: "POST",
				url: apiRoute,
				data: newResourceData,
			}),
		[apiRoute, debounceFN],
	)

	const updateResource = React.useCallback(
		(resourceId, updates) =>
			debounceFN({
				method: "PATCH",
				url: `${apiRoute}/${resourceId}`,
				data: updates,
			}),
		[apiRoute, debounceFN],
	)

	const deleteResource = React.useCallback(
		(resourceId) =>
			debounceFN({
				method: "DELETE",
				url: `${apiRoute}/${resourceId}`,
			}),
		[apiRoute, debounceFN],
	)

	return [
		resource,
		{
			fetch: fetchResource,
			create: createResource,
			update: updateResource,
			delete: deleteResource,
		},
		processing,
	]
}

export function mergedSetTimeout(action1Fn, action2Fn, delay1, delay2) {
	const timeoutId = setTimeout(() => {
		action1Fn()
		setTimeout(action2Fn, delay2)
	}, delay1)

	return () => clearTimeout(timeoutId)
}
