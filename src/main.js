const exp = require('express')
const routes = exp.Router() 
const product = require('./routes/productroute')
const users = require("./routes/userroute")
const auth = require("./routes/authroute")


routes.use("/product", product) // untuk menambahkan middleware
routes.use("/users", users)
routes.use("/auth", auth)



module.exports = routes