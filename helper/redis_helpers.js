const { redisClient } = require("../redis_config.js")

const setRedisKeyValue = async (key, value) => {
    return await redisClient.set(key,JSON.stringify(value))
}

const deleteRedisKey = async (key) => {
    await redisClient.del(key)
}

const getRedisKeys = async (key) => {
    return await redisClient.keys(key)
}

const getMultipleKeyValues = async (keys) => {
    return await redisClient.mGet(keys)
}

const getValueByKey = async (key) => {
    return await redisClient.get(key)
} 

const redisTransaction = redisClient.multi()

module.exports = {
    setRedisKeyValue,
    deleteRedisKey,
    getRedisKeys,
    getMultipleKeyValues,
    getValueByKey,
    redisTransaction
}