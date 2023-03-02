const express = require("express");
const { addAdmin, login, getAdmin } = require("../controllers/authController");

const router = express.Router();

router.post("/addAdmin", addAdmin);
router.post("/login", login);
router.get("/getAdmin", getAdmin);

module.exports = router;
