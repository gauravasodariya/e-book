const express = require("express");
const userController = require("../controller/userContoller");

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
