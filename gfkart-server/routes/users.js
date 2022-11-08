const router = require("express").Router()
const userController = require("../controller/userController")


router.route("/")
        .get(userController.getAllUsers)
        .post(userController.createNewUser)
        .patch(userController.updateUser)
        .delete(userController.deleteUser)

router.route("/:id")
        .get(userController.getUser)

module.exports = router