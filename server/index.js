import app from "./app.js"
import { PORT } from "./utils/config.js"

app.listen(PORT, () => {
	console.info(`server running on http://localhost:${PORT}`)
})
