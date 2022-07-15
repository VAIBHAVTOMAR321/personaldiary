const express = require("express");
const router = express.Router();
const SignUpController = require("../Controller/SignUpController");

router.post("/", SignUpController.signup);

module.exports = router;