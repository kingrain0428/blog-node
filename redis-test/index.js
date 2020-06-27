const redis = require('redis');

const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('error', err => {
    console.error(err);
})

redisClient.set('newname', 'wangyu2', redis.print);

redisClient.get('newname', (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(data);
    redisClient.quit();
})