const router = require("express").Router()
const logoutController = require("../controller/logoutController")

router.get("/",logoutController)

module.exports = router