function validateEmail(email) {
	// Basic email validation using a regular expression
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

function validatePasswordStrength(password) {
	// Password strength criteria: At least 8 characters, with a mix of uppercase, lowercase, numbers, and special characters
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
	return passwordRegex.test(password)
}

export { validateEmail, validatePasswordStrength }
