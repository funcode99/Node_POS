const redis = require("redis")

class Redis {
    constructor() {
        this.redisconn = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
        })
    }

    redisCheck() {
        return new Promise((resolve, reject) => {
            this.redisconn.get("test", (err, res) => {
                if (err) {
                    reject("You're not connected to Redis")
                }
                if (res === "OK" || res === null) {
                    resolve("You're now connected to Redis")
                }
            })
        })
    }



}

module.exports = new Redis()

