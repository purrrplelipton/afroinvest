import "dotenv/config"

const PORT = process.env.PORT
const URI = process.env.URI
const HASH_COMPLEXITY = process.env.HASH_COMPLEXITY

export { HASH_COMPLEXITY, PORT, URI }
