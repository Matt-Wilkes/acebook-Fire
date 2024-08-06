const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.create);
router.get("/", UsersController.getAllUsers)
router.get("/:userId", UsersController.getUser)
router.get("/get-user", UsersController.findUserById);
router.put("/update-user", UsersController.updateUserById);

module.exports = router;
