const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

const redisClinet = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: () => 1000,
});

redisClinet.on('connect', () => {
  console.log('[+] Connected to the Redis server');
});

redisClinet.on('error', (err) => {
  console.log('[-] Failed to connect to the Redis server');
  console.error(err);
});

module.exports = redisClinet;
