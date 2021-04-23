const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

const redisClinet = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  // retry_strategy: () => 1000,
});

redisClinet.on('connect', () => {
  console.log('[+] Connected to Redis server');
});

module.exports = redisClinet;
