const pool = require('pg-pool')
require("dotenv").config()
const { Pool } = require('pg')
const mydb = new Pool({
    user : process.env.DB_USER,
    database : process.env.DB_DATABASE,
    password : process.env.DB_PASS ,
    host : process.env.DB_HOST
})

console.log(process.env.DB_USER)


module.exports = mydb