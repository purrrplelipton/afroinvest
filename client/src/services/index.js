export async function GetRiskData(score) {
	try {
		const response = await fetch(`gwy/${score}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
		})

		if (!response.ok) {
			throw new Error(`Request failed with status: ${response.status}`)
		}

		const data = await response.json()

		return { data }
	} catch (error) {
		console.error("Error fetching data:", error.message)
		throw error
	}
}
