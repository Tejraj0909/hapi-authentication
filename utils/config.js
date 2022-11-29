module.exports = {
    jwtAuthOptions: {
		key: process.env.JWT_SECRET,
		algorithm: 'HS256'
	}
}