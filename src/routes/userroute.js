const express = require("express");
const controller = require("../controller/usercontroller");
const Route = express.Router();

const Validate = require("../middleware/validate");
const Cache = require("../middleware/cache");

Route.get("/", Validate.Admin, controller.getAll);
Route.get("/", controller.getByUser);
Route.post("/", controller.addUsers);
Route.delete("/:id", controller.delUsers);

Route.post("/auth", controller.authUsers);
Route.delete("/", Validate.user, controller.logoutUsers);

module.exports = Route;
