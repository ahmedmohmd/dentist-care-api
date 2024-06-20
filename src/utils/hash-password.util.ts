import bcrypt from "bcrypt";
const SALT: number = 10;

/**
 * Encrypts the given plain text using bcrypt hash function with the provided salt.
 *
 * @param {string} plainText - the plain text to be encrypted
 * @return {Promise<string>} a promise that resolves to the encrypted hash of the plain text
 */
const encrypt = (plainText: string) => {
  return bcrypt.hash(plainText, SALT);
};

/**
 * Compares inputText with hashedText using bcrypt.
 *
 * @param {string} inputText - The input text to compare.
 * @param {string} hashedText - The hashed text to compare against.
 * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the inputText matches the hashedText.
 */
const check = (inputText: string, hashedText: string) => {
  return bcrypt.compare(inputText, hashedText);
};

export default {
  encrypt,
  check,
};
