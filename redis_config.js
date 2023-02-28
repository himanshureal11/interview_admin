const redis = require('redis')


// const redisClient = redis.createClient({
//     url:`redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_ENDPOINT_URL}:${process.env.REDIS_PORT}`
// });
const redisClient = redis.createClient();
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});


redisClient.connect()

module.exports = {
    redisClient,
}