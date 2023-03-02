const express = require("express");
const sendEmail = require("../controllers/emailController");

const router = express.Router();

router.post("/", sendEmail);

module.exports = router;