import jwt from 'jsonwebtoken'

type TokenData = {
  [key: string]: any
}

/**
 * Generates a web token using the provided TokenData.
 *
 * @param {TokenData} data - The data to be encoded into the token.
 * @return {string} The generated web token.
 */
const generateWebToken = (data: TokenData) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY!)
}

/**
 * Verifies the given web token.
 *
 * @param {string} token - The token to be verified
 * @return {any} The verified token
 */
const verifyWebToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!)
}

export default { generateWebToken, verifyWebToken }
