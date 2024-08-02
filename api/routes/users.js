const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.create);
router.get("/get-user", UsersController.findUserById);

module.exports = router;
