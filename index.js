require("dotenv").config();
const exp = require("express");
const serv = exp();
const port = process.env.PORT;
const routes = require("./src/main");
const database = require("./src/config/db");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const redis = require("./src/config/redis");
const nocache = require("nocache");
const cors = require("cors");
const { redisCheck } = require("./src/config/redis");
var fs = require('fs')
var logger = require('morgan');

serv.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
serv.use(logger('dev'));

serv.listen(port, () => {
  console.log(`sudah jalan di port ${port}`);
});

serv.use(cors({ credentials: true, origin: true }));
serv.use(nocache());

serv.use("/public", exp.static("public"));

database
  .connect()
  .then(() => {
    console.log("database connect");
  })
  .catch(() => {
    console.log(process.env.DB_DATABASE);
    console.log("database not connect");
  });

redis
  .redisCheck()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

serv.use(bodyParser.urlencoded({ extended: false }));
serv.use(bodyParser.json());
serv.use(morgan("dev"));
serv.use(routes);
