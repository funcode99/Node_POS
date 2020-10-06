const respond = require("../config/response");
const redis = require("../config/redis");

const Cache = {};

Cache.product = (req, resS, next) => {
  redis.redisconn.get(`product${req.url}`, (error, resR) => {
    if (error)
      return respond(req, resS, {
        code: 500,
        errMsg: error.message || "cannot connect with redis",
        error: true,
      });

    if (resR !== null)
      return respond(req, resS, {
        code: 200,
        values: JSON.parse(resR),
        success: true,
      });
    next();
  });
};

module.exports = Cache;
