const express = require("express");
const userController = require("../controllers/UsersController");
const router = express.Router();

router.get("/users", userController.getAllUser);
router.get("/signup", userController.createUser);

module.exports = router;