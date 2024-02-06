import "dotenv/config"

const PORT = process.env.PORT
const URI = process.env.URI
const HASH_COMPLEXITY = process.env.HASH_COMPLEXITY
const JWT_SECRET = process.env.JWT_SECRET

export { HASH_COMPLEXITY, JWT_SECRET, PORT, URI }
