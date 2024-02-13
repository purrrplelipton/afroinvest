import "dotenv/config"

const PORT = process.env.PORT
const URI = process.env.URI
const HASH_COMPLEXITY = process.env.HASH_COMPLEXITY
const PASSWORD_SECRET = process.env.PASSWORD_SECRET
const AUTH_USER = process.env.AUTH_USER
const AUTH_PASS = process.env.AUTH_PASS
const EMAIL_SECRET = process.env.AUTH_PASS

export { AUTH_PASS, AUTH_USER, EMAIL_SECRET, HASH_COMPLEXITY, PASSWORD_SECRET, PORT, URI }
