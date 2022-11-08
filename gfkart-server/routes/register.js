const router = require("express").Router()
const registerController = require("../controller/registerController")

router.post("/",registerController)

module.exports = router