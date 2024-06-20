import constantsConfig from "../../config/constants.config";
import redisClient from "../../db/redis";

/**
 * A function to retrieve data from a Redis cache using a key.
 *
 * @param {string} key - the key to retrieve data from the cache
 * @return {any} the data retrieved from the cache, parsed as JSON
 */
const get = async (key: string | undefined | null) => {
	try {
		if (!key) return;

		const result: any = await redisClient.get(key);

		if (!result) {
			return null;
		}

		return JSON.parse(result);
	} catch (error) {
		console.error(error);
	}
};

/**
 * Sets a key-value pair in the Redis database with a specific expiration time.
 *
 * @param {string} key - the key to set in the Redis database
 * @param {any} data - the value to associate with the key
 * @return {Promise<string>} a Promise that resolves to a string representing the result of the set operation
 */
const set = async (key: string, data: any) => {
	return await redisClient.setex(
		key,
		constantsConfig.cacheExpireTime,
		JSON.stringify(data)
	);
};

const deleteKey = async (key: string) => {
	return await redisClient.del(key);
};

export default {
	set,
	get,
	deleteKey,
};
